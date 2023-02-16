import type { Expenditure } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { Result } from '@srtp/core'
import { defaultError, fail, ok } from '@srtp/core'
import type {
  CreateExpenditureSchema,
  ExpenditureSchema,
} from '~/common/validators'
import { prisma } from '~/db.server'

export async function getDepartmentExpenditures() {
  return (
    await prisma.expenditure.findMany({
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

// export async function getDepartments() {
//   return await prisma.department.findMany({
//     select: { id: true, department: true },
//   })
// }

// export type DepartmentExpenditure = GetPrismaListType<
//   typeof getDepartmentExpenditures
// >

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
  data: CreateExpenditureSchema,
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
  data: ExpenditureSchema,
): Promise<Result<string, ExpenditureSchema>> {
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
