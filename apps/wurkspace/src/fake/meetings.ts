import { CalendarEvent, Meeting as PrismaMeeting } from '@prisma/client'
import { addDays, addHours, subDays, subHours } from 'date-fns'
import { v4 as uuid } from 'uuid'

type Event = Omit<CalendarEvent, 'createdAt' | 'updatedAt'>

export const previousEvent: Event = {
  id: uuid(),
  attendee1Email: 'venkat@technoidentity.com',
  attendee2Email: 'sravani.dande@technoidentity.com',
  attendee1ResponseStatus: 'accepted',
  attendee2ResponseStatus: 'accepted',
  startTime: subDays(new Date(), 100),
  endTime: addHours(subDays(new Date(), 100), 1),
}

export const futureEvent: Event = {
  id: uuid(),
  attendee1Email: 'venkat@technoidentity.com',
  attendee2Email: 'sravani.dande@technoidentity.com',
  attendee1ResponseStatus: 'accepted',
  attendee2ResponseStatus: 'tentative',
  startTime: addDays(new Date(), 100),
  endTime: addHours(addDays(new Date(), 100), 12),
}

export const currentEvent: Event = {
  id: uuid(),
  attendee1Email: 'venkat@technoidentity.com',
  attendee2Email: 'sravani.dande@technoidentity.com',
  attendee1ResponseStatus: 'accepted',
  attendee2ResponseStatus: 'accepted',
  startTime: subHours(new Date(), 1),
  endTime: addHours(new Date(), 1),
}

export const calendarEvents: Record<string, Event> = {
  previousEvent,
  currentEvent,
  futureEvent,
  // {
  //   id: uuid(),
  //   attendee1Email: '',
  //   attendee2Email: '',
  //   attendee1ResponseStatus: 'accepted',
  //   attendee2ResponseStatus: 'declined',
  //   startTime: new Date(),
  //   endTime: new Date(),
  // },
  // {
  //   id: uuid(),
  //   attendee1Email: '',
  //   attendee2Email: '',
  //   attendee1ResponseStatus: 'accepted',
  //   attendee2ResponseStatus: 'declined',
  //   startTime: new Date(),
  //   endTime: new Date(),
  // },
}

type Meeting = Omit<PrismaMeeting, 'createdAt' | 'updatedAt'>

export const previousMeeting: Meeting = {
  id: previousEvent.id,
  currentState: 'completed',
  startTime: previousEvent.startTime,
  endTime: previousEvent.endTime,
}
export const futureMeeting: Meeting = {
  id: futureEvent.id,
  currentState: 'scheduled',
  startTime: null,
  endTime: null,
}
export const currentMeeting: Meeting = {
  id: currentEvent.id,
  currentState: 'scheduled',
  startTime: currentEvent.startTime,
  endTime: null,
}

export const meetings: Record<string, Meeting> = {
  previousMeeting,
  currentMeeting,
  futureMeeting,
  // {
  //   id: uuid(),
  //   currentState: 'completed',
  //   startTime: null,
  //   endTime: null,
  // },
  // {
  //   id: uuid(),
  //   currentState: 'scheduled',
  //   startTime: null,
  //   endTime: null,
  // },
  // {
  //   id: uuid(),
  //   currentState: 'scheduled',
  //   startTime: null,
  //   endTime: null,
  // },
  // {
  //   id: uuid(),
  //   currentState: 'scheduled',
  //   startTime: null,
  //   endTime: null,
  // },
}
