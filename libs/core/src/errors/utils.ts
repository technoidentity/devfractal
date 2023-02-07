import { SafeParseReturnType, ZodError } from 'zod'
import { isObject, isStr, jstr } from '../types'
import { fail, ok, Result } from './result'
import { failure as tryFailure, success as trySuccess, Try } from './try'

export function toError(err: unknown): Error {
  return err instanceof Error
    ? err
    : isObject(err) && 'message' in err && isStr(err.message)
    ? new Error(err.message)
    : new Error(jstr(err))
}

export function tryFromZod<Output, Input = Output>(
  result: SafeParseReturnType<Input, Output>,
): Try<Output> {
  return result.success
    ? trySuccess(result.data)
    : tryFailure(toError(result.error))
}

export function resultFromZod<Output, Input = Output>(
  result: SafeParseReturnType<Input, Output>,
): Result<ZodError<Input>, Output> {
  return result.success ? ok(result.data) : fail(result.error)
}
