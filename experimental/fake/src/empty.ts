import { faker } from '@faker-js/faker'
import { map, pipe, range, toArray } from '@srtp/fn'
import { z } from 'zod'
export const SupportedTypes = z.enum([
  'ZodBoolean',
  'ZodNumber',
  'ZodString',
  'ZodDate',
  'ZodLiteral',
  'ZodEnum',
  'ZodArray',
  'ZodObject',
  'ZodTuple',
  'ZodUnion',
  'ZodIntersection',
  'ZodMap',
  'ZodRecord',
  'ZodSet',
  'ZodPromise',
  'ZodUndefined',
  'ZodNull',
  'ZodAny',
  'ZodUnknown',
  'ZodMap',
  'ZodSet',
  'ZodOptional',
  'ZodNullable',
  'unknown',
  'any',
  'ZodEffects',
])
export function empty<Spec extends z.ZodTypeAny>(
  spec: Spec,
): z.infer<typeof spec> {
  const type: string = spec._def.typeName

  if (type === 'ZodNumber') {
    return 0
  }

  if (type === 'ZodString') {
    return ''
  }

  if (type === 'ZodBoolean') {
    return false
  }

  if (type === 'ZodObject') {
    const shape = spec._def.shape()
    return Object.entries(shape).reduce((acc: any, [key, spec]: any) => {
      acc[key] = empty(spec)
      return acc
    }, {})
  }

  if (type === 'ZodArray') {
    return pipe(
      range(0, faker.number.int({ max: 20 })),
      map(() => empty(spec._def.type)),
      toArray,
    )
  }

  return undefined
}
