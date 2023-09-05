import { z } from 'zod'

export const Primitive = z.union([
  z.number(),
  z.date(),
  z.string(),
  z.bigint(),
  z.boolean(),
])

export type Primitive = z.infer<typeof Primitive>

export const Fundamental = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.bigint(),
])
export type Fundamental = z.infer<typeof Fundamental>

export const ZodPrimitive = z.union([
  z.instanceof(z.ZodString),
  z.instanceof(z.ZodNumber),
  z.instanceof(z.ZodBoolean),
  z.instanceof(z.ZodDate),
  z.instanceof(z.ZodBigInt),
  z.instanceof(z.ZodDefault<z.ZodString>),
  z.instanceof(z.ZodDefault<z.ZodNumber>),
  z.instanceof(z.ZodDefault<z.ZodBoolean>),
  z.instanceof(z.ZodDefault<z.ZodDate>),
  z.instanceof(z.ZodDefault<z.ZodBigInt>),
])

export type ZodPrimitive = z.infer<typeof ZodPrimitive>
