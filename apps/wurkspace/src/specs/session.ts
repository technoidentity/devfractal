import { IsoDate } from '@core/isoDate'
import { z } from 'zod'

export const Session = z.object({
  id: z.string(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: IsoDate,
})

export type Session = z.infer<typeof Session>
