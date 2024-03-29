import type { Ctc } from '@prisma/client'
import type { CreateCtcSpec } from '~/common'
import { dbTry, entityExists, entityNotFound } from '~/common'
import { prisma } from '~/db.server'

export async function getCtcList() {
  return (
    await prisma.ctc.findMany({
      include: {
        user: { select: { username: true } },
      },
    })
  ).map(({ user, ...rest }) => ({ ...rest, username: user.username }))
}

export type CtcList = Awaited<ReturnType<typeof getCtcList>>

export const createCtc = (data: CreateCtcSpec) =>
  dbTry(() => prisma.ctc.create({ data }), { mapError: entityExists('ctc') })

export const deleteCtc = (id: Ctc['id']) =>
  dbTry(() => prisma.ctc.delete({ where: { id } }), {
    mapError: entityNotFound('ctc'),
  })

export const updateCtc = (data: Ctc) =>
  dbTry(() => prisma.ctc.update({ where: { id: data.id }, data }))
