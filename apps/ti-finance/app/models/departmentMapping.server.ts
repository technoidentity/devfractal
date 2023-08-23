import type { Department, Prisma } from '@prisma/client'
import { isUndefined } from '@srtp/core'
import type {
  CostSearchSpec,
  CreateMappingSpec,
  MappingSearchSpec,
  MappingSpec,
  SpendSearchSpec,
} from '~/common'
import { dbTry, entityExists, entityNotFound } from '~/common'
import { prisma } from '~/db.server'

export function getDepartmentList() {
  return prisma.department.findMany()
}

export async function getDepartmentMappingsList(where?: MappingSearchSpec) {
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

function getMappingWhere(q?: CostSearchSpec) {
  if (isUndefined(q)) return undefined
  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  if (isUndefined(from) && isUndefined(to)) return undefined

  const range = { gte: from, lte: to }

  return {
    departmentId: q.departmentId,
    OR: [{ fromDate: range }, { toDate: range }],
  } satisfies Prisma.DepartmentMappingGroupByArgs['where']
}

function getExpenditureWhere(q?: CostSearchSpec) {
  if (isUndefined(q)) return undefined

  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  return {
    departmentId: q.departmentId,
    date: { gte: from, lte: to },
  } satisfies Prisma.ExpenditureGroupByArgs['where']
}

export async function getDepartmentsCost(q?: CostSearchSpec) {
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

function getSpendWhere(q?: SpendSearchSpec) {
  if (isUndefined(q)) return undefined

  const fromDate = { gte: q.dateRange?.[0] ?? undefined }
  const toDate = { lte: q.dateRange?.[1] ?? undefined }

  return { tiId: q.tiId, fromDate, toDate }
}

export async function getPeopleSpend(q?: SpendSearchSpec) {
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

const entity = 'department mapping'
export const createDepartmentMapping = (data: CreateMappingSpec) =>
  dbTry(() => prisma.departmentMapping.create({ data }), {
    mapError: entityExists(entity),
  })

export const deleteDepartmentMapping = (id: Department['id']) =>
  dbTry(
    () =>
      prisma.departmentMapping.delete({
        where: { id },
      }),
    { mapError: entityNotFound(entity) },
  )

export const updateDepartmentMapping = (data: MappingSpec) =>
  dbTry(() =>
    prisma.departmentMapping.update({
      data,
      where: { id: data.id },
    }),
  )
