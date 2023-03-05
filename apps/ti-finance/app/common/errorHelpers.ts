import { defaultError } from '@srtp/core'
import { Prisma } from '~/prisma-client'

export function entityExists(entity: string) {
  return (e: unknown): string =>
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
      ? `${entity} already exists`
      : defaultError(e)
}

export function entityNotFound(entity: string) {
  return () => `No ${entity} found`
}
