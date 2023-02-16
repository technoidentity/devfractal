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
        Department: { select: { id: true, name: true } },
      },
    })
  ).map(budget => ({
    id: budget.id,
    category: budget.category,
    amount: budget.amount,
    financialYear: budget.financialYear.getFullYear(),
    department: budget.Department.name,
    departmentId: budget.Department.id,
  }))
}

export type BudgetAllocation = GetPrismaListType<typeof getBudgetAllocations>
