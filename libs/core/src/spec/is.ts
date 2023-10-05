import { z } from 'zod'

import type { Fundamental } from './primitive'

type Fn = (...args: any[]) => any

export function is<T, Spec extends z.ZodType<T>>(
  spec: Spec,
  v: unknown,
): v is z.infer<Spec> {
  return spec.safeParse(v).success
}

// from sindresorhus/is
export type OptPrimitive = Fundamental | symbol

const primitiveTypeNames = [
  'null',
  'undefined',
  'string',
  'number',
  'bigint',
  'boolean',
  'symbol',
] as const

type PrimitiveTypeNames = typeof primitiveTypeNames
type PrimitiveTypeName = PrimitiveTypeNames[number]

function isOfType<T extends OptPrimitive | Fn>(
  type: PrimitiveTypeName | 'function',
) {
  return (value: unknown): value is T => typeof value === type
}

export const isStr = isOfType<string>('string')
export const isFloat = (n: unknown): n is number => isNum(n) && !isInt(n)
export const isBool = isOfType<boolean>('boolean')
export const isFunction = isOfType<Fn>('function')
export const isEmail = (s: unknown): s is string => is(z.string().email(), s)
export const isNum = isOfType<number>('number')
export const isInt = (s: unknown): s is number => Number.isInteger(s)
export const isDate = (s: unknown): s is Date => s instanceof Date

export const isObject = (value: unknown): value is object =>
  !isNull(value) && typeof value === 'object'

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value)

export const isReadonlyArray = (value: unknown): value is readonly unknown[] =>
  Array.isArray(value)

export const isUndefined = (s: unknown): s is undefined => s === undefined
export const isDefined = <T>(s: T | undefined): s is T => s !== undefined

export const isNull = (s: unknown): s is null => s === null
export const isNotNull = <T>(s: T | null): s is T => !isNull(s)

export const isNil = (s: unknown): s is null | undefined => s == null
export const isNotNil = <T>(s: T | null | undefined): s is T => !isNil(s)

export const isNullish = isNil
export const isNotNullish = isNotNil

export const isNilSpec = (s: unknown): boolean =>
  s instanceof z.ZodUndefined ||
  s instanceof z.ZodNull ||
  s instanceof z.ZodVoid ||
  s instanceof z.ZodNever ||
  (s instanceof z.ZodOptional && isNilSpec(s._def.innerType)) ||
  (s instanceof z.ZodNullable && isNilSpec(s._def.innerType))

export const isNotNilSpec = (s: unknown): boolean => !isNilSpec(s)

export const isPromise = <T>(s: unknown): s is Promise<T> =>
  s instanceof Promise
