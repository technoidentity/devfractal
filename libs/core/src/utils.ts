import { fail, ok, type Result, type Try } from '@srtp/result'
import { isArray, isObject, isStr, jstr } from '@srtp/spec'
import { z } from 'zod'

export function tryFromZod<Output, Input>(
  result: z.SafeParseReturnType<Input, Output>,
): Try<Output> {
  return result.success ? ok(result.data) : fail(result.error)
}

export function resultFromZod<Output, Input>(
  result: z.SafeParseReturnType<Input, Output>,
): Result<z.ZodError<Input>, Output> {
  return result.success ? ok(result.data) : fail(result.error)
}

export function tap<T>(arg: T): T {
  console.log(jstr(arg))
  return arg
}

export function strict<T extends z.ZodRawShape>(o: T) {
  return z.object(o).strict()
}

export function jlog(o: unknown): void {
  console.log(jstr(o))
}

export function logError(error?: unknown): void {
  if (!error) {
    return
  }

  if (isStr(error)) {
    console.error(error)
  } else {
    console.log(jstr(error))
  }
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isEmpty(x: unknown): boolean {
  return (
    x === undefined ||
    x === null ||
    (isStr(x) && x.trim() === '') ||
    (isArray(x) && x.length === 0) ||
    (isObject(x) && Object.keys(x).length === 0)
  )
}
