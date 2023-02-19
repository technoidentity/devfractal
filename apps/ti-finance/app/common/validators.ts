import { Billable } from '@prisma/client'
import { date, number, positive, schema, string } from '@srtp/validator'
import { z } from 'zod'

export const IntId = schema({ id: number() })
export type IntId = z.infer<typeof IntId>

export const StrId = schema({ id: number() })
export type StrId = z.infer<typeof StrId>

export const BillableSchema = z.nativeEnum(Billable).default('billable')
export type BillableSchema = z.infer<typeof BillableSchema>

export const CtcSchema = schema({
  id: number(),
  tiId: string(),
  ctc: positive(),
  fromDate: date(),
  toDate: date(),
})

export type CtcSchema = z.infer<typeof CtcSchema>

export const ListCtcSchema = CtcSchema.extend({ name: string() })

export type ListCtcSchema = z.infer<typeof ListCtcSchema>

export const CreateCtcSchema = CtcSchema.omit({ id: true })

export type CreateCtcSchema = z.infer<typeof CreateCtcSchema>

export const BudgetSchema = schema({
  id: number(),
  departmentId: number(),
  category: BillableSchema,
  amount: positive(),
  financialYear: date(),
})

// function specs()

export type BudgetSchema = z.infer<typeof BudgetSchema>

export const ExpenditureSchema = schema({
  id: number(),
  amount: positive(),
  date: date(),
  category: BillableSchema,
  remarks: string(),
  departmentId: number(),
})

export type ExpenditureSchema = z.infer<typeof ExpenditureSchema>

export const ListExpenditureSchema = ExpenditureSchema.extend({
  departmentId: number(),
  department: string(),
  id: number(),
})

export type ListExpenditureSchema = z.infer<typeof ListExpenditureSchema>

export const CreateExpenditureSchema = ExpenditureSchema.omit({
  id: true,
})

export type CreateExpenditureSchema = z.infer<typeof CreateExpenditureSchema>

export const DepartmentMappingSchema = schema({
  id: number(),
  tiId: string(),
  ctc: positive(),
  departmentId: number(),
  fromDate: date(),
  toDate: date(),
  category: BillableSchema,
})

export const ListDepartmentSchema = DepartmentMappingSchema.extend({
  username: string(),
})

export type ListDepartmentSchema = z.infer<typeof ListDepartmentSchema>

export type DepartmentMappingSchema = z.infer<typeof DepartmentMappingSchema>

export const CostSchema = schema({
  id: string(),
  department: string(),
  peopleCost: number(),
  otherExpenditures: number(),
  totalCost: number(),
})

export type CostSchema = z.infer<typeof CostSchema>

export const PeopleSpendSchema = z.object({
  tiId: z.string(),
  username: z.string(),
  cost: z.number().int().positive(),
  department: z.string(),
})

export type PeopleSpendSchema = z.infer<typeof PeopleSpendSchema>
