import type { Expenditure } from '@prisma/client'
import {
  CreateExpenditureSpec,
  entityExists,
  entityNotFound,
  ExpenditureSearchSpec,
  ExpenditureSpec,
} from '~/common'

import { prisma } from '~/db.server'
import { dbTry } from '../common'

function getWhere(q?: ExpenditureSearchSpec) {
  if (q === undefined) return undefined

  const from = q.dateRange?.[0]
  const to = q.dateRange?.[1]

  return {
    departmentId: q.departmentId,
    date: { gte: from, lte: to },
    category: q.category,
  }
}

export async function getDepartmentExpenditures(q?: ExpenditureSearchSpec) {
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

const entity = 'expenditure'

export const deleteExpenditure = (id: Expenditure['id']) =>
  dbTry(
    () =>
      prisma.expenditure.delete({
        where: { id },
      }),
    { mapError: entityNotFound(entity) },
  )

export const createExpenditure = (data: CreateExpenditureSpec) =>
  dbTry(
    () =>
      prisma.expenditure.create({
        data: {
          amount: data.amount,
          date: data.date,
          remarks: data.remarks,
          category: data.category,
          Department: { connect: { id: data.departmentId } },
        },
      }),
    { mapError: entityExists(entity) },
  )

export const updateExpenditure = (data: ExpenditureSpec) =>
  dbTry(() =>
    prisma.expenditure.update({
      where: { id: data.id },
      data: {
        amount: data.amount,
        date: data.date,
        remarks: data.remarks,
        category: data.category,
        Department: { connect: { id: data.departmentId } },
      },
    }),
  )
