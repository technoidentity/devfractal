import { fail, ok, type Result, type Try } from '@srtp/result'
import { isArray, isObject, isStr, jstr } from '@srtp/spec'
import { z } from 'zod'

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

export const tap = <T>(arg: T): T => {
  console.log(jstr(arg))
  return arg
}

export const strict = <T extends z.ZodRawShape>(o: T) => z.object(o).strict()

export const jlog = (o: unknown): void => {
  console.log(jstr(o))
}

export const logError = (error?: unknown) => {
  if (!error) {
    return
  }
  if (isStr(error)) {
    console.error(error)
  } else {
    console.log(jstr(error))
  }
}

export const delay = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export function isEmpty(x: unknown) {
  return (
    x === undefined ||
    x === null ||
    (isStr(x) && x.trim() === '') ||
    (isArray(x) && x.length === 0) ||
    (isObject(x) && Object.keys(x).length === 0)
  )
}
