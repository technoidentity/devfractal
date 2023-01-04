import { IsoDate } from '@core/isoDate'
import { z } from 'zod'
import { ResponseStatus } from './enums'

export const CalendarEvent = z.object({
  id: z.string(),
  startTime: IsoDate,
  endTime: IsoDate,
  attendee1ResponseStatus: ResponseStatus,
  attendee2ResponseStatus: ResponseStatus,
  attendee1Email: z.string(),
  attendee2Email: z.string(),
})
