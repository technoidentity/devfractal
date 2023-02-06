import { number, string } from 'zod'
import { is } from './casts'

// from sindresorhus/is
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

const primitiveTypeNames = [
  'null',
  'undefined',
  'string',
  'number',
  'bigint',
  'boolean',
  'symbol',
] as const

type PrimitiveTypeName = (typeof primitiveTypeNames)[number]

function isOfType<T extends Primitive | Function>(
  type: PrimitiveTypeName | 'function',
) {
  return (value: unknown): value is T => typeof value === type
}

export const isStr = isOfType<string>('string')
export const isFloat = (n: unknown): n is number => isNum(n) && !isInt(n)
export const isBool = isOfType<boolean>('boolean')
export const isFunction = isOfType<Function>('function')

export const isEmail = (s: unknown): s is string => is(string().email(), s)
export const isNum = isOfType<number>('number')
export const isInt = (s: unknown): s is number => is(number().int(), s)

export const isObject = (value: unknown): value is object =>
  !isNull(value) && (typeof value === 'object' || isFunction(value))

export const isArray = (value: unknown): value is unknown[] =>
  Array.isArray(value)

export const isUndefined = (s: unknown): s is undefined => s === undefined
export const isNull = (s: unknown): s is null => s === null
export const isNil = (s: unknown): s is null | undefined =>
  s === null || s === undefined

export const isNullish = isNil