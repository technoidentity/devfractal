import { sget } from '@core/api'
import type { CalendarEvent } from '@prisma/client'
import type { Employee } from '@specs/employee'
import { toStr } from '@srtp/spec'
import { setDifference } from '@srtp/fn'
import { prisma } from '@core/prisma'
import { addDays, subDays } from 'date-fns'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import type { Args } from './utils'
import { getProfileFromZoho } from './zohoProfile'

// const meetings: UpcomingReturnValues = {
//   upComingMeetData: [],
// }
// @TODO: enable after prototyping
// filter the events coming from calendar-API
// const filteredItems = events.items?.filter(
//   item =>
//     item.organizer.email.endsWith('@technoidentity.com') &&
//     item.attendees.length === 2 &&
//     item.attendees.filter(attendee =>
//       attendee.email.endsWith('@technoidentity.com'),
//     ).length === 2,
// )

export const OtherUserType = z.enum(['Manager', 'Other'])
export type OtherUserType = z.infer<typeof OtherUserType>

export const getGoogleEvent = async (
  args: Args<'accessToken' | 'email' | 'id'>,
) => {
  const accessToken = toStr(args.accessToken)
  // const email = toStr(args.email)
  const eventId = toStr(args.id)

  const event = await sget({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    response: z.any(), // @TODO: CalendarEvent[],
  })(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
  )

  // const otherAttendee =
  //   event.attendee1Email === email ? event.attendee2Email : event.attendee1Email

  // const userProfile = await getProfile(email)
  // const otherProfile = await getProfile(otherAttendee)

  const meeting = await prisma.meeting.upsert({
    where: { id: eventId },
    create: {
      id: event.id,
      currentState: 'scheduled',
    },
    include: {
      actions: true,
      discussions: true,
    },
    update: {},
  })

  return meeting
}

const getAllEmails = (events: any[]): Set<string> => {
  const emails = new Set<string>()
  for (const event of events) {
    emails.add(event.attendees[0].email)
    emails.add(event.attendees[1].email)
  }
  return emails
}

export const getGoogleEvents = async (
  args: Args<'accessToken' | 'email'>,
): Promise<CalendarEvent[]> => {
  const accessToken = toStr(args.accessToken)
  const email = toStr(args.email)

  // @TODO: get only rest of this week?
  const min = subDays(new Date(), 1).toISOString()
  const max = addDays(new Date(), 7).toISOString()

  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${min}&timeMax=${max}`

  const calendarEvents = await sget({
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    response: z.any(), // @TODO: z.object({ items: z.array(CalendarEvent) }),
  })(url)

  const meetings: CalendarEvent[] = []
  const profiles = new Map<string, Employee>()

  // const get = async (email: string) => {
  //   let profile = profiles.get(email)
  //   if (profile) {
  //     return profile
  //   }
  //   profile = await getProfile(email)
  //   profiles.set(email, profile)
  //   return profile
  // }

  const events = calendarEvents.items.filter((e: any) => !e.attendees)
  const otherEmails = getAllEmails(events)

  const dbProfiles = await prisma.employee.findMany({
    where: { email: { in: Array.from(otherEmails) } },
  })

  const zohoEmails = setDifference(
    otherEmails,
    new Set(dbProfiles.map(p => p.email)),
  )
  for (const p of dbProfiles) {
    profiles.set(p.email, p)
  }
  for (const zemail of zohoEmails) {
    profiles.set(zemail, await getProfileFromZoho(zemail))
  }

  const userProfile = profiles.get(email)
  for (const evt of events) {
    invariant(
      email === evt.attendees[0].email || email === evt.attendees[1].email,
    )

    const [user, other] =
      evt.attendees[0].email === email
        ? [evt.attendees[0], evt.attendees[1]]
        : [evt.attendees[1], evt.attendees[0]]

    const otherProfile = profiles.get(other.email)

    // otherAttendee.responseStatus
    const meeting = {
      id: evt.id,
      startTime: evt.start.dateTime,
      endTime: evt.end.dateTime,
      attendee1ResponseStatus: user.responseStatus,
      attendee2ResponseStatus: other.responseStatus,
      attendee1Email: user.email,
      attendee2Email: other.email,
      attendee1: userProfile,
      attendee2: otherProfile,
    }

    meetings.push(meeting)
  }

  return meetings
}

// events.items.forEach((item, index) =>
//   meetings.upComingMeetData.push({
//     id: index,
//     dueDate: `${new Date(item.start.dateTime).toDateString()} ${new Date(
//       item.start.dateTime,
//     ).toLocaleTimeString()}`,
//     status: `${
//       item.attendees.filter(
//         attendee =>
//           attendee.responseStatus === 'needsAction' ||
//           attendee.responseStatus === 'tentative' ||
//           attendee.responseStatus === 'declined',
//       ).length !== 0
//         ? 'needsAction'
//         : 'accepted'
//     }`,
//     empMail: item.attendees[0].email,
//   }),
// )
