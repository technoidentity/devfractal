import { toStr } from '@srtp/spec'
import { prisma } from '@core/prisma'
import type { CalendarEvent, Meeting } from '@prisma/client'
import type {
  CardsResponse,
  MeetingResponse,
  PreviousMeetingsResponse,
  UpComingMeetingsResponse,
} from '@ui/responses'
import type { Args } from './utils'

export const getMeetings = async (args: Args<'email'>): Promise<Meeting[]> => {
  const email = toStr(args.email)
  const meetings = await prisma.meeting.findMany({
    where: {
      calendarEvent: {
        OR: [{ attendee1: { email } }, { attendee2: { email } }],
      },
    },
  })
  return meetings
}

export const getMeeting = async (
  args: Args<'eventId'>,
): Promise<MeetingResponse | null> => {
  const id = toStr(args.eventId)

  const meeting = await prisma.meeting.findUnique({
    where: { id },
    include: {
      actions: true,
      discussions: true,
      calendarEvent: {
        include: {
          attendee1: true,
          attendee2: true,
        },
      },
    },
  })

  return meeting
}

export const createMeeting = async (
  args: Args<'calendarEvent'>,
): Promise<Meeting> => {
  const calendarEvent = args.calendarEvent as CalendarEvent

  return prisma.meeting.create({
    data: {
      currentState: 'scheduled',
      calendarEvent: { create: calendarEvent },
    },
  })
}

export const updateMeeting = async (
  args: Args<'id' | 'meeting'>,
): Promise<Meeting> => {
  const meetingId = toStr(args.id)

  return prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: args.meeting as Meeting,
  })
}

export const getCards = async (args: Args<'id'>): Promise<CardsResponse> => {
  const meetingId = toStr(args.id)

  const cardList = await prisma.meeting.findFirst({
    where: {
      id: meetingId,
    },
    include: { actions: true, discussions: true },
  })

  if (cardList == null) {
    throw new Error(`Not able to find card
    s with meetingId:${meetingId}`)
  }
  const cards = [...cardList.actions, ...cardList.discussions]

  return cards
}

export const getCompletedMeetings = async (
  args: Args<'email'>,
): Promise<PreviousMeetingsResponse> => {
  const email = toStr(args.email)

  const result = await prisma.meeting.findMany({
    where: {
      currentState: { equals: 'completed' },
      calendarEvent: {
        OR: [{ attendee1: { email } }, { attendee2: { email } }],
      },
    },
    include: {
      calendarEvent: {
        include: {
          attendee1: true,
          attendee2: true,
        },
      },
    },
  })

  return result
}

export const getScheduledMeetings = async (
  args: Args<'email'>,
): Promise<UpComingMeetingsResponse> => {
  const email = toStr(args.email)
  const meetings = await prisma.meeting.findMany({
    where: {
      currentState: { equals: 'scheduled' },
      calendarEvent: {
        OR: [{ attendee1: { email } }, { attendee2: { email } }],
      },
    },
    include: {
      calendarEvent: {
        include: {
          attendee1: true,
          attendee2: true,
        },
      },
    },

    // @TODO: need to maintain responseStatus in db?
  })

  return meetings
}

// const otherType =
//   userProfile.managerEmail === otherProfile.email ? 'Manager' : 'Other'
