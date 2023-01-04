import { boolean, number, string } from 'zod'
import { cast, is } from './casts'

export const str = (s: unknown): string => cast(string(), s)
export const num = (s: unknown): number => cast(number(), s)
export const int = (s: unknown): number => cast(number().int(), s)
export const bool = (s: unknown): boolean => cast(boolean(), s)
export const jstr = (s: unknown): string => JSON.stringify(s, null, 2)

export const isStr = (s: unknown): s is string => is(string(), s)
export const isEmail = (s: unknown): s is string => is(string().email(), s)

export const isNum = (s: unknown): s is number => is(number(), s)

export const isInt = (s: unknown): s is number => is(number().int(), s)

export const isFloat = (n: unknown): n is number => isNum(n) && !isInt(n)

export const isBool = (s: unknown): s is boolean => is(boolean(), s)

export const isUndefined = (s: unknown): s is undefined => s === undefined
export const isNull = (s: unknown): s is null => s === null
export const isNil = (s: unknown): s is null | undefined =>
  s === null || s === undefined

export const isNullish = isNil

export const toInt = (s: unknown): number => int(+str(s))
export const toNum = (s: unknown): number => num(+str(s))
