import type { DeepReadonly } from 'ts-essentials'
import { z } from 'zod'
import { isStr, jstr } from './types'

export const tap = <T>(arg: T): T => {
  console.log(jstr(arg))
  return arg
}

export const range = (start: number, end: number) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export const strict = <T extends z.ZodRawShape>(o: T) => z.object(o).strict()

export type Infer<T extends z.ZodTypeAny> = DeepReadonly<z.infer<T>>

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
