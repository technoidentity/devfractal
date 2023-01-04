import { IsoDate } from '@core/isoDate'
import { z } from 'zod'
import { MeetingStatus } from './enums'

export const Meeting = z.object({
  id: z.string(),
  startTime: IsoDate.nullable(),
  endTime: IsoDate.nullable(),
  currentState: MeetingStatus.nullable(),
})

export type MeetingSpec = z.infer<typeof Meeting>
