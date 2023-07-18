import { z } from 'zod'

export const Fundamental = z.union([
  z.coerce.string(),
  z.coerce.number(),
  z.coerce.boolean(),
  z.coerce.date(),
  z.coerce.bigint(),
])

export type Primitive = z.infer<typeof Fundamental>

export const ZodFundamental = z.union([
  z.instanceof(z.ZodString),
  z.instanceof(z.ZodNumber),
  z.instanceof(z.ZodBoolean),
  z.instanceof(z.ZodDate),
  z.instanceof(z.ZodBigInt),
])

export type ZodFundamental = z.infer<typeof ZodFundamental>
