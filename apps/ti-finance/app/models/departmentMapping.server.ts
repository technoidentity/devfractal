import type { Department, DepartmentMapping } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { defaultError, fail, ok } from '@srtp/core'
import type {
  CostSearchSpec,
  CreateMappingSpec,
  MappingSearchSpec,
  MappingSpec,
  SpendSearchSpec,
} from '~/common'
import { prisma } from '~/db.server'
import type { DbResult } from './types'

export async function getDepartmentList() {
  return await prisma.department.findMany()
}

export async function getDepartmentMappingsList(
  where?: Partial<MappingSearchSpec>,
) {
  const mappings = await prisma.departmentMapping.findMany({
    where,
    include: {
      User: { select: { username: true } },
      Department: { select: { name: true } },
    },
  })
  return mappings.map(({ Department, User, ...rest }) => ({
    ...rest,
    username: User.username,
    departmentName: Department.name,
  }))
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

function getMappingWhere(q?: Partial<CostSearchSpec>) {
  if (q === undefined) return undefined
  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  if (from === undefined && to === undefined) return undefined

  const range = { gte: from, lte: to }

  return {
    departmentId: q.departmentId,
    OR: [{ fromDate: range }, { toDate: range }],
  } satisfies Prisma.DepartmentMappingGroupByArgs['where']
}

function getExpenditureWhere(q?: Partial<CostSearchSpec>) {
  if (q === undefined) return undefined

  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  return {
    departmentId: q.departmentId,
    date: { gte: from, lte: to },
  } satisfies Prisma.ExpenditureGroupByArgs['where']
}

export async function getDepartmentsCost(q?: Partial<CostSearchSpec>) {
  const where = getMappingWhere(q)
  const expenditureWhere = getExpenditureWhere(q)

  const personCost = (
    await prisma.departmentMapping.groupBy({
      by: ['departmentId'],
      _sum: { ctc: true },
      where,
    })
  ).map(({ departmentId, _sum }) => ({
    departmentId,
    total: _sum.ctc ?? 0,
  }))

  const expenditures = (
    await prisma.expenditure.groupBy({
      by: ['departmentId'],
      _sum: { amount: true },
      where: expenditureWhere,
    })
  ).map(({ departmentId, _sum }) => ({
    departmentId,
    total: _sum.amount ?? 0,
  }))

  return { personCost, expenditures }
}

function getSpendWhere(q?: Partial<SpendSearchSpec>) {
  if (q === undefined) return undefined

  const fromDate = { gte: q.dateRange?.[0] ?? undefined }
  const toDate = { lte: q.dateRange?.[1] ?? undefined }

  return { tiId: q.tiId, fromDate, toDate }
}

export async function getPeopleSpend(q?: Partial<SpendSearchSpec>) {
  const where = getSpendWhere(q)
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
