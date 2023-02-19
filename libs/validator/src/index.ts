import type { Try } from '@srtp/core'
import { failure, success } from '@srtp/core'
import { z } from 'zod'

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

export const url = (defaultValue?: string) =>
  defaultValue ? z.string().url().default(defaultValue) : z.string().url()

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

export const bigint = (defaultValue = 0n) =>
  defaultValue ? z.coerce.bigint().default(defaultValue) : z.coerce.bigint()

export const nil = z.union([z.null(), z.undefined()])

export const oneOf = z.enum
// export const array = z.array

export type ZodPrimitive =
  | z.ZodNumber
  | z.ZodString
  | z.ZodBoolean
  | z.ZodDate
  | z.ZodBigInt
  | z.ZodLiteral<any>
  | z.ZodEnum<any>
  | z.ZodNativeEnum<any>

export type FieldSchema =
  | z.ZodOptional<z.ZodDefault<ZodPrimitive>>
  | z.ZodOptional<ZodPrimitive>
  | z.ZodDefault<ZodPrimitive>
  | ZodPrimitive

export function empty<T extends FieldSchema>(spec: T) {
  return z.union([spec, z.literal('')])
}

// nesting and arrays not supported yet
export type FormRawShape = { [k: string]: FieldSchema }

export type GetRawShape<T> = T extends z.ZodEffects<infer R>
  ? GetRawShape<R>
  : T extends z.AnyZodObject
  ? T['shape']
  : never

export function getRawShape<T extends z.ZodEffects<any> | z.AnyZodObject>(
  spec: T,
): GetRawShape<T> {
  return spec instanceof z.ZodEffects
    ? // eslint-disable-next-line no-underscore-dangle
      getRawShape(spec._def.schema)
    : spec.shape
}

export type FormSchema = z.ZodEffects<any> | z.AnyZodObject

export function schema<T extends FormRawShape>(shape: T) {
  return z.object(shape)
}

export function validate<T extends FormRawShape, Spec extends z.ZodSchema<T>>(
  schema: Spec,
  value: unknown,
): Try<z.infer<Spec>> {
  const r = schema.safeParse(value)
  return r.success ? success(r.data) : failure(r.error) // @TODO: format error
}

export function fieldValidate<Spec extends FieldSchema>(
  schema: Spec,
  value: unknown,
): Try<z.infer<Spec>> {
  const r = schema.safeParse(value)
  return r.success ? success(r.data) : failure(r.error) // @TODO: format error
}
