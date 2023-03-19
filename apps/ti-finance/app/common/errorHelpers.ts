import { toStringError } from '@srtp/result'
import { Prisma } from '~/prisma-client'

export function entityExists(entity: string) {
  return (e: unknown): string =>
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002'
      ? `${entity} already exists`
      : toStringError(e)
}

export function entityNotFound(entity: string) {
  return () => `No ${entity} found`
}
