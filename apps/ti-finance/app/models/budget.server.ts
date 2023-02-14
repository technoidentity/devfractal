import type { GetPrismaListType } from '~/common/prismaTypes'
import { prisma } from '~/db.server'

export async function getBudgetAllocations() {
  return (
    await prisma.budget.findMany({
      select: {
        id: true,
        category: true,
        amount: true,
        financialYear: true,
        Department: { select: { department: true } },
      },
    })
  ).map(budget => ({
    id: budget.id,
    category: budget.category,
    amount: budget.amount,
    financialYear: budget.financialYear,
    department: budget.Department.department,
  }))
}

export type BudgetAllocation = GetPrismaListType<typeof getBudgetAllocations>
