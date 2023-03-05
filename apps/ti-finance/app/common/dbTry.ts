import type { Result} from '@srtp/core';
import { fail, ok, resultMapError } from '@srtp/core'
import type { PrismaClientKnownRequestError } from '~/prisma-client/runtime'

// export class CreateError extends PrismaClientKnownRequestError {}

// export class EditError extends PrismaClientKnownRequestError {}

// export class DeleteError extends PrismaClientKnownRequestError {}

// export class ReadError extends PrismaClientKnownRequestError {}

// export class AuthError extends PrismaClientKnownRequestError {}

type PrismaErr = PrismaClientKnownRequestError
type Return<T> = Promise<Result<string, T>>

type MapErrorArgs = { mapError?: (e: PrismaClientKnownRequestError) => string }

export async function dbTry<T>(
  fn: () => Promise<T>,
  options?: MapErrorArgs,
): Return<T> {
  const res = await fn()
    .then(v => ok<PrismaErr, T>(v))
    .catch(e => fail<PrismaErr, T>(e))

  const mapError = options?.mapError ?? (e => e.message)
  return resultMapError(res, mapError)
}
