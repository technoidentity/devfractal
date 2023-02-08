import type { Department } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { Result } from '@srtp/core'
import { defaultError, fail, ok } from '@srtp/core'
import { prisma } from '~/db.server'

export const getDepartments = () => {
  return prisma.department.findMany()
}

export const createDepartment = async (
  data: Department,
): Promise<Result<string, Department>> => {
  try {
    const department = await prisma.department.create({ data })
    return ok(department)
  } catch (e) {
    const err =
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? 'user id already exists'
        : defaultError(e)

    return fail(err)
  }
}

export async function deleteDepartment(
  data: Department,
): Promise<Result<string, Department>> {
  try {
    const dept = await prisma.department.delete({
      where: {
        id: data.id,
      },
    })

    return ok(dept)
  } catch (e) {
    return fail('user not found')
  }
}

export async function editDepartment(
  data: Department,
): Promise<Result<string, Department>> {
  try {
    const result = await prisma.department.update({
      where: { id: data.id?.toString() },
      data,
    })

    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}
