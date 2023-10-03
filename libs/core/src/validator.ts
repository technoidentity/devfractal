/* eslint-disable no-underscore-dangle */

import invariant from 'tiny-invariant'
import type { ZodEnum, ZodNativeEnum } from 'zod'
import { z } from 'zod'
import type { errorUtil } from 'zod/lib/helpers/errorUtil'

import type { Try } from './result'
import type { BoolLike, DateLike, IsoDateLike, NumLike } from './spec'
import { tryFromZod } from './utils'

const Num = z.coerce.number()

export const number = (defaultValue = 0) => Num.default(defaultValue)

export const int = (defaultValue = 0, message?: errorUtil.ErrMessage) =>
  Num.int(message).default(defaultValue)

export const positive = (defaultValue = 0, message?: errorUtil.ErrMessage) =>
  Num.positive(message).default(defaultValue)

export const nonnegative = (defaultValue = 0, message?: errorUtil.ErrMessage) =>
  Num.nonnegative(message).default(defaultValue)

export const negative = (defaultValue = 0, message?: errorUtil.ErrMessage) =>
  Num.negative(message).default(defaultValue)

export const nonpositive = (defaultValue = 0, message?: errorUtil.ErrMessage) =>
  Num.nonpositive(message).default(defaultValue)

export const string = (defaultValue = '') =>
  z.coerce.string().default(defaultValue)

export const boolean = (defaultValue = false) =>
  z.boolean().default(defaultValue)

export const date = z.coerce.date

export const DateRange = z.array(date()).max(2).brand<'DateRange'>()
export type ZodDateRange = typeof DateRange
export type DateRange = z.infer<typeof DateRange>

export const dateRange = () => DateRange

const BigInt = z.coerce.bigint()
export const bigint = (defaultValue = 0n) =>
  defaultValue ? BigInt.default(defaultValue) : BigInt

export const nil = z.union([z.null(), z.undefined()])

export const oneOf = z.enum

export type ZodValidatorPrimitive =
  | z.ZodNumber
  | z.ZodString
  | z.ZodBoolean
  | z.ZodDate
  | z.ZodBigInt
  | z.ZodLiteral<any>
  | z.ZodEnum<any>
  | z.ZodNativeEnum<any>
  | typeof NumLike
  | typeof BoolLike
  | typeof DateLike
  | typeof IsoDateLike

export type FieldSpec =
  | z.ZodOptional<z.ZodDefault<ZodValidatorPrimitive>>
  | z.ZodOptional<ZodValidatorPrimitive>
  | z.ZodDefault<ZodValidatorPrimitive>
  | ZodValidatorPrimitive
  | ZodDateRange // only to support DateRangePicker

// nesting and arrays not supported yet
export type ValidatorRawShape = { [k: string]: FieldSpec }

export type ValidatorSpec = z.ZodEffects<any> | z.AnyZodObject

export function spec<T extends ValidatorRawShape>(shape: T) {
  return z.object(shape)
}

export function array<T extends ValidatorSpec>(spec: T) {
  return z.array(spec)
}

export function validate<
  T extends ValidatorRawShape,
  Spec extends z.ZodSchema<T>,
>(schema: Spec, value: unknown): Try<z.infer<Spec>> {
  const r = schema.safeParse(value)
  return tryFromZod(r)
}

export function fieldValidate<Spec extends FieldSpec>(
  schema: Spec,
  value: unknown,
): Try<z.infer<Spec>> {
  const r = schema.safeParse(value)
  return tryFromZod(r)
}

export function defaultValue<Spec extends FieldSpec>(
  spec: Spec,
): z.infer<Spec> {
  switch (spec._def.typeName) {
    case 'ZodDefault':
      return (spec as any)._def.defaultValue
    case 'ZodString':
      return ''
    case 'ZodNumber':
      return 0
    case 'ZodBoolean':
      return false
    case 'ZodBigInt':
      return 0n
    case 'ZodDate':
      return new Date()
    case 'ZodEnum':
      return (spec as ZodEnum<any>)._def.values[0]
    case 'ZodNativeEnum':
      return (spec as ZodNativeEnum<any>)._def.values[0]
    case 'ZodOptional':
      return undefined

    default:
      invariant(false, 'defaultValue not implemented for this type')
  }
}
