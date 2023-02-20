import { Billable } from '@prisma/client'
import { date, number, positive, spec, string } from '@srtp/validator'
import { z } from 'zod'

export const IntId = spec({ id: number() })
export type IntId = z.infer<typeof IntId>

export const StrId = spec({ id: number() })
export type StrId = z.infer<typeof StrId>

export const BillableSpec = z.nativeEnum(Billable).default('billable')
export type BillableSpec = z.infer<typeof BillableSpec>

export const CtcSpec = spec({
  id: number(),
  tiId: string(),
  ctc: positive(),
  fromDate: date(),
  toDate: date(),
})

export type CtcSpec = z.infer<typeof CtcSpec>

export const CreateCtcSpec = CtcSpec.omit({ id: true })

export type CreateCtcSpec = z.infer<typeof CreateCtcSpec>

export const BudgetSpec = spec({
  id: number(),
  departmentId: number(),
  category: BillableSpec,
  amount: positive(),
  financialYear: date(),
})

// function specs()

export type BudgetSpec = z.infer<typeof BudgetSpec>

export const ExpenditureSpec = spec({
  id: number(),
  amount: positive(),
  date: date(),
  category: BillableSpec,
  remarks: string(),
  departmentId: number(),
})

export type ExpenditureSpec = z.infer<typeof ExpenditureSpec>

export const CreateExpenditureSpec = ExpenditureSpec.omit({
  id: true,
})

export type CreateExpenditureSpec = z.infer<typeof CreateExpenditureSpec>

export const MappingSpec = spec({
  id: number(),
  tiId: string(),
  ctc: positive(),
  departmentId: number(),
  fromDate: date(),
  toDate: date(),
  category: BillableSpec,
})

export type MappingSpec = z.infer<typeof MappingSpec>

export const CreateMappingSpec = MappingSpec.omit({
  id: true,
})

export type CreateMappingSpec = z.infer<typeof CreateMappingSpec>

export const CostSpec = spec({
  id: string(),
  department: string(),
  peopleCost: number(),
  otherExpenditures: number(),
  totalCost: number(),
})

export type CostSpec = z.infer<typeof CostSpec>

export const SpendSpec = z.object({
  tiId: z.string(),
  username: z.string(),
  cost: z.number().int().positive(),
  department: z.string(),
})

export type SpendSpec = z.infer<typeof SpendSpec>
