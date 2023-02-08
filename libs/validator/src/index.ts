import type { Try } from '@srtp/core'
import { failure, success } from '@srtp/core'
import { coerce, z, ZodNativeEnum } from 'zod'
export const number = coerce.number()
export const int = coerce.number().int()
export const positive = coerce.number().positive()
export const nonnegative = coerce.number().nonnegative()
export const negative = coerce.number().negative()
export const nonpositive = coerce.number().nonpositive()

export const boolean = coerce.boolean()
export const date = coerce.date()
export const bigint = coerce.bigint()
export const nil = z.union([z.null(), z.undefined()])

export const string = z.coerce.string()

export const email = z.string().email()
export const url = z.string().url()
export const uuid = z.string().uuid()
export const cuid = z.string().cuid()
export const datetime = z.string().datetime()
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
  | ZodNativeEnum<any>

export type FieldSchema = ZodPrimitive | z.ZodOptional<ZodPrimitive>

export function empty<T extends FieldSchema>(spec: T) {
  return z.union([spec, z.literal('')])
}

// nesting and arrays not supported yet
export type ZodRawShape = { [k: string]: FieldSchema }

export type FormSchema<T extends ZodRawShape> = z.ZodObject<T>

export function schema<T extends ZodRawShape>(shape: T) {
  return z.object(shape)
}

export function validate<T extends ZodRawShape, Spec extends z.ZodSchema<T>>(
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
