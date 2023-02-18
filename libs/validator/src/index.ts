import type { Try } from '@srtp/core'
import { failure, success } from '@srtp/core'
import { z } from 'zod'

export const number = (defaultValue = 0) =>
  z.coerce.number().default(defaultValue)

export const int = (defaultValue = 0) =>
  z.coerce.number().int().default(defaultValue)

export const positive = (defaultValue = 0) =>
  z.coerce.number().positive().default(defaultValue)

export const nonnegative = (defaultValue = 0) =>
  z.coerce.number().nonnegative().default(defaultValue)

export const negative = (defaultValue: number) =>
  z.coerce.number().negative().default(defaultValue)

export const nonpositive = (defaultValue: number) =>
  z.coerce.number().nonpositive().default(defaultValue)

export const string = (defaultValue = '') =>
  z.coerce.string().default(defaultValue)

export const email = (defaultValue: string) =>
  z.string().email().default(defaultValue)

export const url = (defaultValue: string) =>
  z.string().url().default(defaultValue)

export const uuid = (defaultValue: string) =>
  z.string().uuid().default(defaultValue)

export const cuid = (defaultValue: string) =>
  z.string().cuid().default(defaultValue)

export const datetime = (defaultValue: string) =>
  z.string().datetime().default(defaultValue)

export const boolean = (defaultValue = false) =>
  z.coerce.boolean().default(defaultValue)

export const date = (defaultValue?: Date) =>
  defaultValue ? z.coerce.date().default(defaultValue) : z.coerce.date()

export const bigint = (defaultValue = 0n) =>
  z.coerce.bigint().default(defaultValue)

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
  | z.ZodOptional<z.ZodDefault<ZodPrimitive> | ZodPrimitive>
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
