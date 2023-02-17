import { Billable } from '@prisma/client'
import { date, number, positive, schema, string } from '@srtp/validator'
import { z } from 'zod'

export const CtcSchema = schema({
  id: number,
  tiId: string,
  ctc: positive,
  fromDate: date,
  toDate: date,
})

export const ListCtcSchema = CtcSchema.extend({ name: string })

export type ListCtcSchema = z.infer<typeof ListCtcSchema>

export type CtcSchema = z.infer<typeof CtcSchema>

export const CreateCtcSchema = CtcSchema.omit({ id: true })

export type CreateCtcSchema = z.infer<typeof CreateCtcSchema>

const BillableSchema = z.nativeEnum(Billable)

export const BudgetSchema = schema({
  id: number,
  departmentId: number,
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

export const ListExpenditureSchema = ExpenditureSchema.extend({
  department: string,
})

export type ListExpenditureSchema = z.infer<typeof ListExpenditureSchema>

export const CreateExpenditureSchema = ExpenditureSchema.omit({
  id: true,
})

export type CreateExpenditureSchema = z.infer<typeof CreateExpenditureSchema>

export const DepartmentMappingSchema = schema({
  id: number,
  tiId: string,
  ctc: number.positive(),
  departmentId: number,
  fromDate: date,
  toDate: date,
  category: BillableSchema,
})

export const ListDepartmentSchema = DepartmentMappingSchema.extend({
  username: string,
})

export type ListDepartmentSchema = z.infer<typeof ListDepartmentSchema>

export type DepartmentMappingSchema = z.infer<typeof DepartmentMappingSchema>

export const CostSchema = schema({
  id: string,
  department: string,
  peopleCost: number,
  otherExpenditures: number,
  totalCost: number,
})

export type CostSchema = z.infer<typeof CostSchema>

export const PeopleSpendSchema = schema({
  tiId: string,
  username: string,
  cost: number.positive(),
  department: string,
})

export type PeopleSpendSchema = z.infer<typeof PeopleSpendSchema>
