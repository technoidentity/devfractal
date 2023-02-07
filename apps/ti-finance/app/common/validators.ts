import { date, positive, schema, string } from '@srtp/validator'
import type { z } from 'zod'

export const CtcSchema = schema({
  id: string,
  name: string.min(2, { message: 'Name should have at least 2 letters' }),
  ctc: positive,
  fromDate: date,
  toDate: date,
})

export type CtcSchema = z.infer<typeof CtcSchema>
