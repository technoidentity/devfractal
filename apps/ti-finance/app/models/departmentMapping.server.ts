import type { Department, DepartmentMapping } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { defaultError, fail, ok } from '@srtp/core'
import type { CreateMappingSpec, MappingSpec } from '~/common'
import { prisma } from '~/db.server'
import type { DbResult } from './types'

export async function getDepartmentList() {
  return await prisma.department.findMany()
}

export async function getDepartmentMappingsList(
  where?: Prisma.DepartmentMappingFindManyArgs['where'],
) {
  return await prisma.departmentMapping.findMany({
    where,
  })
}

type Result = DbResult<DepartmentMapping>

export async function createDepartmentMapping(data: CreateMappingSpec): Result {
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

export async function deleteDepartmentMapping(id: Department['id']): Result {
  try {
    const dept = await prisma.departmentMapping.delete({
      where: { id },
    })

    return ok(dept)
  } catch (e) {
    return fail('user not found')
  }
}

export async function updateDepartmentMapping(data: MappingSpec): Result {
  try {
    const result = await prisma.departmentMapping.update({
      data,
      where: { id: data.id },
    })
    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}

export async function getDepartmentsCost() {
  const personCost = (
    await prisma.departmentMapping.groupBy({
      by: ['departmentId'],
      _sum: { ctc: true },
    })
  ).map(({ departmentId, _sum }) => ({
    departmentId,
    total: _sum.ctc ?? 0,
  }))

  const expenditures = (
    await prisma.expenditure.groupBy({
      by: ['departmentId'],
      _sum: { amount: true },
    })
  ).map(({ departmentId, _sum }) => ({
    departmentId,
    total: _sum.amount ?? 0,
  }))

  return { personCost, expenditures }
}

export async function getPeopleSpend(
  where?: Prisma.DepartmentMappingWhereInput,
) {
  console.log({ where })
  const personCost = (
    await prisma.departmentMapping.groupBy({
      by: ['tiId', 'departmentId'],
      _sum: { ctc: true },
      where,
    })
  ).map(p => ({
    tiId: p.tiId,
    departmentId: p.departmentId,
    ctc: p._sum.ctc || 0,
  }))

  return { personCost }
}
