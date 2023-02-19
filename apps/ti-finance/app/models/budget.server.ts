import type { GetPrismaListType } from '~/common'
import { prisma } from '~/db.server'

export async function getBudgetAllocations() {
  return (
    await prisma.budget.findMany({
      select: {
        id: true,
        category: true,
        amount: true,
        financialYear: true,
        Department: { select: { id: true, name: true } },
      },
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
