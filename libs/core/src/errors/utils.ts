import type { z } from 'zod'
import { isObject, isStr, jstr } from '../specs'
import type { Result } from './result'
import { fail, ok } from './result'
import type { Try } from './try'

export const toStringError = (err: unknown): string =>
  err instanceof Error
    ? err.message
    : isObject(err) && 'message' in err && isStr(err.message)
    ? err.message
    : `unexpected prisma error: ${jstr(err)}`

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error(toStringError(err))

export function tryFromZod<Output, Input = Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Try<Output> {
  return result.success ? ok(result.data) : fail(result.error)
}

export function resultFromZod<Output, Input = Output>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<z.ZodError<Input>, Output> {
  return result.success ? ok(result.data) : fail(result.error)
}
