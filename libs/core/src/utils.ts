import { fail, ok, type Result, type Try } from '@srtp/result'
import { isArray, isObject, isStr, isUndefined, jstr } from './spec'
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

export function jlog(o: unknown): void {
  console.log(jstr(o))
}

export function tap<T>(arg: T): T {
  jlog(arg)
  return arg
}

export function strict<T extends z.ZodRawShape>(o: T) {
  return z.object(o).strict()
}

export function logError(error?: unknown): void {
  if (error) {
    console.error(error)
  }
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function isEmpty(x: unknown): boolean {
  return (
    isUndefined(x) ||
    (isStr(x) && x.trim() === '') ||
    (isArray(x) && x.length === 0) ||
    (isObject(x) && Object.keys(x).length === 0)
  )
}

export function isEmptyString(x: unknown): boolean {
  return isUndefined(x) || (isStr(x) && x.trim() === '')
}

export function isNonEmptyString(x: unknown): x is string {
  return isStr(x) && x.trim() !== ''
}

export function isKey<T extends object>(obj: T, k: PropertyKey): k is keyof T {
  return k in obj
}

export function hasKey<T extends object>(obj: T, k: PropertyKey): k is keyof T {
  return k in obj && obj.hasOwnProperty(k)
}

export const logAsyncError = (promise: Promise<any>) => {
  promise.catch(console.error)
}
