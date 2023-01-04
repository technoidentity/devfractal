import { z } from 'zod'

export const IsoDate = z.preprocess(arg => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return new Date(arg)
  }
}, z.date())

type IsoDate = z.infer<typeof IsoDate>
