import type { Ctc, PrismaPromise } from '@prisma/client'
import { Prisma } from '@prisma/client'
import { cast } from '@srtp/core'
import { _CtcModel } from 'prisma/zod'

import { prisma } from '~/db.server'

export const getUsersCtc = (): PrismaPromise<Ctc[]> => {
  return prisma.ctc.findMany()
}

const defaultError = (e: unknown) =>
  ({
    type: 'failure',
    error:
      e instanceof Error
        ? e.message
        : `unexpected prisma error: ${JSON.stringify(e)}`,
  } as const)

export const createUserCtc = async (userCtc: Ctc) => {
  try {
    const result = await prisma.ctc.create({
      data: userCtc,
    })
    return { type: 'success', data: result } as const
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return {
          type: 'failure',
          error: 'user id already exists',
        } as const
      }
    }

    return defaultError(e)
  }
}

export const deleteUserCtc = async (id: Ctc['id']) => {
  try {
    const result = await prisma.ctc.delete({
      where: {
        id,
      },
    })
    return { type: 'success', data: result } as const
  } catch (e) {
    return {
      type: 'failure',
      error: 'user not found',
    } as const
  }
}

export const editUserCtc = async (ctcArg: Ctc) => {
  const ctc = cast(_CtcModel, ctcArg)
  try {
    const result = await prisma.ctc.update({
      where: {
        id: ctc.id?.toString(),
      },
      data: ctc,
    })
    return { type: 'success', data: result } as const
  } catch (e) {
    const err = e instanceof Error ? e.message : ''
    return {
      type: 'failure',
      error: err,
    } as const
  }
}
