import type { Department, DepartmentMapping } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { defaultError, fail, ok } from '@srtp/core'
import type { DepartmentMappingSchema } from '~/common/validators'
import type { CreateMappingSchema } from '~/components/department/specs'
import { prisma } from '~/db.server'
import type { DbResult } from './types'

export async function getDepartmentList() {
  return await prisma.department.findMany()
}

export async function getDepartmentMappingsList() {
  return await prisma.departmentMapping.findMany()
}

type Result = DbResult<DepartmentMapping>

export async function createDepartment(data: CreateMappingSchema): Result {
  try {
    const department = await prisma.departmentMapping.create({ data })

    return ok(department)
  } catch (e) {
    const err =
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? 'user id already exists'
        : defaultError(e)

    return fail(err)
  }
}

export async function deleteDepartment(id: Department['id']): Result {
  try {
    const dept = await prisma.departmentMapping.delete({
      where: { id },
    })

    return ok(dept)
  } catch (e) {
    return fail('user not found')
  }
}

export async function updateDepartment(data: DepartmentMappingSchema): Result {
  try {
    const result = await prisma.departmentMapping.update({
      where: { id: data.id },
      data,
    })
    console.log({ result })
    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}

export async function getDepartmentsCost() {
  const personCost = (
    await prisma.departmentMapping.groupBy({
      by: ['department'],
      _sum: { ctc: true },
    })
  ).map(({ department, _sum }) => ({ department, total: _sum.ctc ?? 0 }))

  const expenditures = (
    await prisma.expenditure.groupBy({
      by: ['departmentId'],
      _sum: { amount: true },
    })
  ).map(({ departmentId, _sum }) => ({ departmentId, total: _sum.amount ?? 0 }))

  return { personCost, expenditures }
}

export async function getPeopleSpend() {
  const personCost = await prisma.departmentMapping.groupBy({
    by: ['tiId', 'department', 'username'],
    _sum: { ctc: true },
  })

  return { personCost }
}
