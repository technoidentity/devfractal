import type { Ctc } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { defaultError, fail, ok } from '@srtp/core'
import type { CreateCtcSpec } from '~/common'
import { prisma } from '~/db.server'
import type { DbResult } from './types'

export function getCtcList() {
  return prisma.ctc.findMany()
}

type Result = DbResult<Ctc>

export async function createCtc(data: CreateCtcSpec): Result {
  try {
    const ctc = await prisma.ctc.create({ data })

    return ok(ctc)
  } catch (e) {
    const err =
      e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
        ? 'user id already exists'
        : defaultError(e)

    return fail(err)
  }
}

export async function deleteCtc(id: Ctc['id']): Result {
  try {
    const ctc = await prisma.ctc.delete({
      where: { id },
    })

    return ok(ctc)
  } catch (e) {
    return fail('user not found')
  }
}

export async function updateCtc(data: Ctc): Result {
  try {
    const result = await prisma.ctc.update({
      where: { id: data.id },
      data,
    })

    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}
