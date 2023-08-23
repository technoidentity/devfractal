import { isUndefined } from '@srtp/core'
import type {
  BudgetSearchSpec,
  BudgetUtilizedSearchSpec,
  GetPrismaListType,
} from '~/common'
import { thisYear } from '~/core'
import { prisma } from '~/db.server'

function getFinancialYear(financialYear?: number) {
  return financialYear ? thisYear(financialYear) : undefined
}

function getWhere(q?: BudgetSearchSpec) {
  if (isUndefined(q)) return undefined

  const financialYear = getFinancialYear(q.financialYear)

  return { ...q, financialYear }
}

export async function getBudgetAllocations(q?: BudgetSearchSpec) {
  const where = getWhere(q)

  return (
    await prisma.budget.findMany({
      select: {
        id: true,
        category: true,
        amount: true,
        financialYear: true,
        Department: { select: { id: true, name: true } },
      },
      where,
    })
  ).map(budget => ({
    id: budget.id,
    category: budget.category,
    amount: budget.amount,
    department: budget.Department.name,
    departmentId: budget.Department.id,
    financialYear: budget.financialYear.getFullYear(),
  }))
}

export type BudgetAllocation = GetPrismaListType<typeof getBudgetAllocations>

export async function getBudgetUtilization(q?: BudgetUtilizedSearchSpec) {
  const where = getWhere(q)
  return (
    await prisma.budget.findMany({
      select: {
        id: true,
        category: true,
        amount: true,
        financialYear: true,
        Department: { select: { id: true, name: true } },
      },
      where,
    })
  ).map(budget => ({
    id: budget.id,
    category: budget.category,
    amount: budget.amount,
    department: budget.Department.name,
    departmentId: budget.Department.id,
    financialYear: budget.financialYear.getFullYear(),
  }))
}
