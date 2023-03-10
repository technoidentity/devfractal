import { IsoDate } from '@core/isoDate'
import { Action } from '@specs/action'
import { CalendarEvent } from '@specs/calenderEvent'
import { Discussion } from '@specs/discussion'
import { Employee } from '@specs/employee'
import { Meeting } from '@specs/meeting'
import { User } from '@specs/user'
import type { TypeOf} from 'zod';
import { nullable, z } from 'zod'

export type CalendarEvent = TypeOf<typeof CalendarEvent>

export const CalendarEventsEvents = z.array(CalendarEvent)
export type CalendarEventsEvents = z.infer<typeof CalendarEventsEvents>

export const MeetingResponse = Meeting.extend({
  discussions: z.array(Discussion),
  actions: z.array(Action),
  calendarEvent: CalendarEvent.extend({
    attendee1: Employee,
    attendee2: Employee,
  }),
})
export type MeetingResponse = Readonly<z.infer<typeof MeetingResponse>>

export const UpcomingMeeting = Meeting.extend({
  calendarEvent: CalendarEvent.extend({
    attendee1: Employee,
    attendee2: Employee,
  }),
  id: z.string(),
  startTime: nullable(IsoDate),
})

export type UpComingMeeting = Readonly<z.infer<typeof UpcomingMeeting>>

export const PreviousMeeting = Meeting.extend({
  calendarEvent: CalendarEvent.extend({
    attendee1: Employee,
    attendee2: Employee,
  }),
})
export type PreviousMeeting = Readonly<z.infer<typeof PreviousMeeting>>

export const UsersResponse = z.array(User)
export type UsersResponse = Readonly<z.infer<typeof UsersResponse>>

export const UpComingMeetingsResponse = z.array(UpcomingMeeting)
export type UpComingMeetingsResponse = Readonly<
  z.infer<typeof UpComingMeetingsResponse>
>

export const PreviousMeetingsResponse = z.array(PreviousMeeting)
export type PreviousMeetingsResponse = Readonly<
  z.infer<typeof PreviousMeetingsResponse>
>

export const CardsResponse = z.array(z.union([Action, Discussion]))
export type CardsResponse = Readonly<z.infer<typeof CardsResponse>>

export const PendingActionsResponse = z.array(Action)
export type PendingActionsResponse = Readonly<
  z.infer<typeof PendingActionsResponse>
>

export type EmployeeResponse = Readonly<z.infer<typeof Employee>>
