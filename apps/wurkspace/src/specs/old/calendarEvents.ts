import { IsoDate } from '@core/isoDate'
import { z } from 'zod'

export const person = z.object({
  email: z.string(),
})

export const time = z.object({
  dateTime: IsoDate,
  timeZone: z.string(),
})
export const event = z.object({
  status: z.enum(['confirmed', 'rejected']),
  created: IsoDate,
  updated: IsoDate,
  summary: z.string(),
  creator: person,
  organizer: person,
  start: time,
  end: time,
  attendees: person
    .extend({
      responseStatus: z.enum([
        'accepted',
        'needsAction',
        'declined',
        'tentative',
      ]),
    })
    .array(),
})

export type Event = z.infer<typeof event>

export type CalendarEvents = {
  items: Event[]
}
