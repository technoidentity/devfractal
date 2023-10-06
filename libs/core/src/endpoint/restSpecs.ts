import { z } from 'zod'
import type { ZodPrimitive } from '../spec'

export function restSpecs<Spec extends z.ZodRawShape & { id: ZodPrimitive }>(
  rawSpec: Spec,
) {
  const one = z.object(rawSpec)
  const many = z.array(one)
  const create = one.omit({ id: true })
  const update = one
    .partial()
    .omit({ id: true })
    .merge(one.pick({ id: true }))
  const remove = one.pick({ id: true })

  return { one, many, create, update, remove } as const
}

export type RestZodTypes<Spec extends z.ZodRawShape & { id: ZodPrimitive }> =
  ReturnType<typeof restSpecs<Spec>>

export type RestTypes<Spec extends z.ZodRawShape & { id: ZodPrimitive }> =
  Readonly<{ [K in keyof RestZodTypes<Spec>]: z.infer<RestZodTypes<Spec>[K]> }>
