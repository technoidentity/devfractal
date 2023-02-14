import { Billable } from '@prisma/client'
import { date, number, positive, schema, string } from '@srtp/validator'
import { z } from 'zod'

// how to define a zod schema for a array objects

export const CtcSchema = schema({
  id: string,
  name: string.min(2, { message: 'Name should have at least 2 letters' }),
  ctc: positive,
  fromDate: date,
  toDate: date,
})

export type CtcSchema = z.infer<typeof CtcSchema>

const BillableSchema = z.nativeEnum(Billable)

export const BudgetSchema = schema({
  id: number,
  category: BillableSchema,
  amount: number.positive(),
  financialYear: date,
})

export type BudgetSchema = z.infer<typeof BudgetSchema>

export const ExpenditureSchema = schema({
  id: number,
  amount: number.positive(),
  date: date,
  category: z.nativeEnum(Billable),
  remarks: string,
  departmentId: number,
})

export type ExpenditureSchema = z.infer<typeof ExpenditureSchema>

export const DepartmentSchema = schema({
  id: number,
  name: string.min(2, { message: 'Name should have at least 2 letters' }),
  ctc: number.positive(),
  department: string,
  fromDate: date,
  toDate: date,
  billable: BillableSchema,
  // budget: z.ex
  // expenditure: z.array(ExpenditureSchema),
})

export type DepartmentSchema = z.infer<typeof DepartmentSchema>
