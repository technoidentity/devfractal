import type { Ctc } from '@prisma/client'
import { Prisma } from '@prisma/client'
import type { Result } from '@srtp/core'
import { defaultError, fail, ok } from '@srtp/core'

import { prisma } from '~/db.server'

export function getCtcList() {
  return prisma.ctc.findMany()
}

export async function createCtc(data: Ctc): Promise<Result<string, Ctc>> {
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

export async function deleteCtc(id: Ctc['id']): Promise<Result<string, Ctc>> {
  try {
    const ctc = await prisma.ctc.delete({
      where: { id },
    })

    return ok(ctc)
  } catch (e) {
    return fail('user not found')
  }
}

export async function updateCtc(data: Ctc): Promise<Result<string, Ctc>> {
  try {
    const result = await prisma.ctc.update({
      where: { id: data.id?.toString() },
      data,
    })

    return ok(result)
  } catch (e) {
    return fail(defaultError(e))
  }
}
