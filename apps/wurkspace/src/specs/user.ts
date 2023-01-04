import { IsoDate } from '@core/isoDate'
import { z } from 'zod'

export const User = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: IsoDate.nullable(),
  image: z.string().nullable(),
})

export type User = z.infer<typeof User>
