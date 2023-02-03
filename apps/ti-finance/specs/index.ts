/* eslint-disable @typescript-eslint/no-redeclare */
import { z } from 'zod'

export const IsoDate = z.preprocess(arg => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return new Date(arg)
  }
  return undefined
}, z.date())

export type IsoDate = z.infer<typeof IsoDate>
