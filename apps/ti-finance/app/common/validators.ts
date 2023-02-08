import { Billable } from '@prisma/client'
import { date, positive, schema, string } from '@srtp/validator'
import { z } from 'zod'

export const CtcSchema = schema({
  id: string,
  name: string.min(2, { message: 'Name should have at least 2 letters' }),
  ctc: positive,
  fromDate: date,
  toDate: date,
})

export type CtcSchema = z.infer<typeof CtcSchema>

const BillableSchema = z.nativeEnum(Billable)

export const DepartmentSchema = schema({
  id: string,
  name: string.min(2, { message: 'Name should have at least 2 letters' }),
  department: string,
  fromDate: date,
  toDate: date,
  billable: BillableSchema,
})

export type DepartmentSchema = z.infer<typeof DepartmentSchema>
