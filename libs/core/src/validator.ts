/* eslint-disable no-underscore-dangle */

import type { Try } from './result'
import invariant from 'tiny-invariant'
import type { ZodEnum, ZodNativeEnum } from 'zod'
import { z } from 'zod'
import { tryFromZod } from './utils'

export const number = (defaultValue?: number) =>
  defaultValue ? z.coerce.number().default(defaultValue) : z.coerce.number()

export const int = (defaultValue?: number) =>
  defaultValue
    ? z.coerce.number().int().default(defaultValue)
    : z.coerce.number().int()

export const positive = (defaultValue?: number) =>
  defaultValue
    ? z.coerce.number().positive().default(defaultValue)
    : z.coerce.number().positive()

export const nonnegative = (defaultValue?: number) =>
  defaultValue
    ? z.coerce.number().nonnegative().default(defaultValue)
    : z.coerce.number().nonnegative()

export const negative = (defaultValue: number) =>
  defaultValue
    ? z.coerce.number().negative().default(defaultValue)
    : z.coerce.number().negative()

export const nonpositive = (defaultValue: number) =>
  defaultValue
    ? z.coerce.number().nonpositive().default(defaultValue)
    : z.coerce.number().nonpositive()

export const string = (defaultValue?: string) =>
  defaultValue ? z.coerce.string().default(defaultValue) : z.coerce.string()

export const email = (defaultValue?: string) =>
  defaultValue ? z.string().email().default(defaultValue) : z.string().email()

export const uuid = (defaultValue?: string) =>
  defaultValue ? z.string().uuid().default(defaultValue) : z.string().uuid()

export const cuid = (defaultValue?: string) =>
  defaultValue ? z.string().cuid().default(defaultValue) : z.string().cuid()

export const datetime = (defaultValue?: string) =>
  defaultValue
    ? z.string().datetime().default(defaultValue)
    : z.string().datetime()

export const boolean = (defaultValue?: boolean) =>
  defaultValue ? z.coerce.boolean().default(defaultValue) : z.coerce.boolean()

export const date = (defaultValue?: Date) =>
  defaultValue ? z.coerce.date().default(defaultValue) : z.coerce.date()

export const DateRange = z.array(date()).max(2).brand<'DateRange'>()
export type ZodDateRange = typeof DateRange
export type DateRange = z.infer<typeof DateRange>

export const dateRange = () => DateRange

export const bigint = (defaultValue = 0n) =>
  defaultValue ? z.coerce.bigint().default(defaultValue) : z.coerce.bigint()

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
