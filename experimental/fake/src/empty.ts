import { faker } from '@faker-js/faker'
import { each, pipe, range } from '@srtp/fn'
import { z } from 'zod'
export const SupportedTypes = z.enum([
  'ZodBoolean',
  'ZodNumber',
  'ZodString',
  'ZodDate',
  'ZodDefault',
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
export function empty(spec: z.ZodTypeAny): z.infer<typeof spec> {
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

  if (type === 'ZodLiteral') {
    return spec._def.value
  }

  if (type === 'ZodArray') {
    return [] as z.infer<typeof spec._def.type>[]
  }

  if (type === 'ZodTuple') {
    return spec._def.items.map((item: z.ZodTypeAny) => empty(item))
  }

  if (type === 'ZodRecord') {
    const rec: any = {}
    pipe(
      range(0, faker.number.int({ max: 20 })),
      each(() => {
        rec[empty(spec._def.keyType)] = empty(spec._def.valueType)
      }),
    )

    return rec
  }

  if (type === 'ZodMap') {
    type Key = z.infer<typeof spec._def.keyType>
    type Value = z.infer<typeof spec._def.valueType>

    return new Map<Key, Value>()
  }

  if (type === 'ZodSet') {
    return new Set<z.infer<typeof spec._def.valueType>>()
  }

  if (type === 'ZodEnum') {
    return Object.values(spec._def.values)
  }

  if (type === 'ZodOptional' || type === 'ZodNullable') {
    return empty(spec._def.innerType)
  }

  if (type === 'ZodUnion') {
    const types = spec._def.options
    const one = faker.number.int({ min: 0, max: types.length - 1 })

    return empty(types[one])
  }

  if (type === 'ZodIntersection') {
    return {
      ...empty(spec._def.left),
      ...empty(spec._def.right),
    }
  }

  if (type === 'ZodAny' || type === 'ZodUnknown') {
    return empty(
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.number()),
        z.object({ foo: z.string(), bar: z.boolean() }),
      ]),
    )
  }

  if (type === 'ZodDefault') {
    return empty(spec._def.innerType)
  }
  if (type === 'ZodDate') {
    return new Date()
  }
  if (type === 'ZodUndefined') {
    return undefined
  }

  if (type === 'ZodNull') {
    return null
  }
  return undefined
}
