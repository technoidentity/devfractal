/* eslint-disable no-underscore-dangle */

import invariant from 'tiny-invariant'
import type { ZodEnum, ZodNativeEnum } from 'zod'
import { z } from 'zod'

import type { Try } from './result'
import { tryFromZod } from './utils'

const Num = z.number()
const Str = z.string()

export const number = (defaultValue?: number) =>
  defaultValue ? Num.default(defaultValue) : Num

const Int = Num.int()

export const int = (defaultValue?: number) =>
  defaultValue ? Int.default(defaultValue) : Int

const Positive = Num.positive()
export const positive = (defaultValue?: number) =>
  defaultValue ? Positive.default(defaultValue) : Positive

const Nonnegative = Num.nonnegative()
export const nonnegative = (defaultValue?: number) =>
  defaultValue ? Nonnegative.default(defaultValue) : Nonnegative

const Negative = Num.negative()
export const negative = (defaultValue: number) =>
  defaultValue ? Negative.default(defaultValue) : Negative

const Nonpositive = Num.nonpositive()
export const nonpositive = (defaultValue: number) =>
  defaultValue ? Nonpositive.default(defaultValue) : Nonpositive

export const string = (defaultValue?: string) =>
  defaultValue ? Str.default(defaultValue) : Str

const Email = Str.email()
export const email = (defaultValue?: string) =>
  defaultValue ? Email.default(defaultValue) : Email

const Uuid = Str.uuid()
export const uuid = (defaultValue?: string) =>
  defaultValue ? Uuid.default(defaultValue) : Uuid

const Cuid = Str.cuid()
export const cuid = (defaultValue?: string) =>
  defaultValue ? Cuid.default(defaultValue) : Cuid

const DateTime = Str.datetime()
export const datetime = (defaultValue?: string) =>
  defaultValue ? DateTime.default(defaultValue) : DateTime

const Bool = z.coerce.boolean()
export const boolean = (defaultValue?: boolean) =>
  defaultValue ? Bool.default(defaultValue) : Bool

const CDate = z.coerce.date()
export const date = (defaultValue?: Date) =>
  defaultValue ? CDate.default(defaultValue) : CDate

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

export type FieldSpec =
  | z.ZodOptional<z.ZodDefault<ZodValidatorPrimitive>>
  | z.ZodOptional<ZodValidatorPrimitive>
  | z.ZodDefault<ZodValidatorPrimitive>
  | ZodValidatorPrimitive
  | ZodDateRange // only to support DateRangePicker

// nesting and arrays not supported yet
export type FormRawShape = { [k: string]: FieldSpec }

export type FormSpec = z.ZodEffects<any> | z.AnyZodObject

export function spec<T extends FormRawShape>(shape: T) {
  return z.object(shape)
}

export function validate<T extends FormRawShape, Spec extends z.ZodSchema<T>>(
  schema: Spec,
  value: unknown,
): Try<z.infer<Spec>> {
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
