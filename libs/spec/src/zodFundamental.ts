import { z } from 'zod'

// @TODO: handle default values too
export const Fundamental = z.union([
  z.coerce.string(),
  z.coerce.number(),
  z.coerce.boolean(),
  z.coerce.date(),
  z.coerce.bigint(),
  z.coerce.string().default(''),
  z.coerce.number().default(0),
  z.coerce.boolean().default(false),
  z.coerce.date().default(new Date(0)),
  z.coerce.bigint().default(BigInt(0)),
])

type Fundamental = typeof Fundamental

export type Primitive = z.infer<typeof Fundamental>

export const ZodFundamental = z.union([
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

export type ZodFundamental = z.infer<typeof ZodFundamental>
