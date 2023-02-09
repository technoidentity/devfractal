import type { Try } from '@srtp/core'
import { failure, success } from '@srtp/core'
import { coerce, z, ZodEffects, ZodNativeEnum } from 'zod'
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
export type FormRawShape = { [k: string]: FieldSchema }

export type GetRawShape<T> = T extends z.ZodEffects<infer R>
  ? GetRawShape<R>
  : T extends z.AnyZodObject
  ? T['shape']
  : never

export function getRawShape<T extends z.ZodEffects<any> | z.AnyZodObject>(
  spec: T,
): GetRawShape<T> {
  return spec instanceof ZodEffects
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
