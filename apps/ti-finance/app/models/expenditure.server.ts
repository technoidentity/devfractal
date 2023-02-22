import type { Expenditure } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { Result } from '@srtp/core'
import { defaultError, fail, ok } from '@srtp/core'
import type { CreateExpenditureSpec, ExpenditureSpec } from '~/common'
import type { ExpenditureSearchSpec } from '~/features/expenditure'
import { prisma } from '~/db.server'

function getWhere(q?: Partial<ExpenditureSearchSpec>) {
  if (q === undefined) return undefined

  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  return {
    departmentId: q.departmentId,
    date: { gte: from, lte: to },
    category: q.category,
  }
}

export async function getDepartmentExpenditures(q?: Partial<ExpenditureSpec>) {
  const where = getWhere(q)

  return (
    await prisma.expenditure.findMany({
      where,
      select: {
        id: true,
        amount: true,
        date: true,
        remarks: true,
        category: true,
        Department: { select: { id: true, name: true } },
      },
    })
  ).map(expenditure => ({
    ...expenditure,
    department: expenditure.Department.name,
    departmentId: expenditure.Department.id,
  }))
}

export async function deleteExpenditure(
  id: Expenditure['id'],
): Promise<Result<string, Expenditure>> {
  try {
    const expe = await prisma.expenditure.delete({
      where: { id },
    })

    return ok(expe)
  } catch (e) {
    return fail('user not found')
  }
}

export async function createExpenditure(
  data: CreateExpenditureSpec,
): Promise<Result<string, Expenditure>> {
  try {
    const exp = await prisma.expenditure.create({
      data: {
        amount: data.amount,
        date: data.date,
        remarks: data.remarks,
        category: data.category,
        Department: { connect: { id: data.departmentId } },
      },
    })

    return ok(exp)
  } catch (e) {
    const err =
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? 'user id already exists'
        : defaultError(e)
    console.error(e)
    return fail(err)
  }
}

export async function updateExpenditure(
  data: ExpenditureSpec,
): Promise<Result<string, ExpenditureSpec>> {
  try {
    const result = await prisma.expenditure.update({
      where: { id: data.id },
      data: {
        amount: data.amount,
        date: data.date,
        remarks: data.remarks,
        category: data.category,
        Department: { connect: { id: data.departmentId } },
      },
    })

    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}
