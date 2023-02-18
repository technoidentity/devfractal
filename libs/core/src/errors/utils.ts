import type { z } from 'zod'
import { isObject, isStr, jstr } from '../types'
import type { Result } from './result'
import { fail, ok } from './result'
import type { Try } from './try'
import { failure as tryFailure, success as trySuccess } from './try'

export const defaultError = (e: unknown) =>
  e instanceof Error
    ? e.message
    : `unexpected prisma error: ${JSON.stringify(e)}`

export function toError(err: unknown): Error {
  return err instanceof Error
    ? err
    : isObject(err) && 'message' in err && isStr(err.message)
    ? new Error(err.message)
    : new Error(jstr(err))
}

export function tryFromZod<Output, Input = Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Try<Output> {
  return result.success
    ? trySuccess(result.data)
    : tryFailure(toError(result.error))
}

export function resultFromZod<Output, Input = Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<z.ZodError<Input>, Output> {
  return result.success ? ok(result.data) : fail(result.error)
}
