/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable no-underscore-dangle */
import { expect } from 'vitest'
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

export type SupportedTypes = z.infer<typeof SupportedTypes>

export function empty(spec: z.ZodTypeAny): any {
  const type: string = spec._def.typeName

  if (type === 'ZodString') {
    return ''
  }

  if (type === 'ZodNumber') {
    return 0
  }

  if (type === 'ZodBoolean') {
    return false
  }

  if (type === 'ZodDate') {
    return new Date()
  }

  if (type === 'ZodLiteral') {
    return ''
  }

  if (type === 'ZodEnum') {
    return spec._def.values[0]
  }

  if (type === 'ZodArray') {
    return []
  }

  if (type === 'ZodTuple') {
    return spec._def.items.map((s: z.ZodTypeAny) => empty(s))
  }

  if (type === 'ZodObject') {
    const shape = spec._def.shape()
    const result = Object.fromEntries(
      Object.entries(shape).map(([key]) => [key, empty(shape[key])]),
    )
    expect(typeof result).toBe('object')

    return result
  }

  if (type === 'ZodRecord') {
    return {}
  }

  if (type === 'ZodMap') {
    return new Map()
  }

  if (type === 'ZodSet') {
    return new Set()
  }

  if (type === 'ZodUnion') {
    const types = spec._def.options
    return empty(types[0])
  }
  if (type === 'ZodIntersection') {
    const left = empty(spec._def.left)
    const right = empty(spec._def.right)

    expect(typeof left).toBe('object')
    expect(typeof right).toBe('object')

    return {
      ...left,
      ...right,
    }
  }

  if (type === 'ZodNullable') {
    return null
  }

  if (type === 'ZodOptional' || type === 'ZodUndefined') {
    return undefined
  }

  if (type === 'ZodNull') {
    return null
  }

  if (type === 'ZodAny' || type === 'ZodUnknown') {
    return null
  }
  if (type === 'ZodDefault') {
    const schemaResult = empty(spec._def.schema)
    expect(typeof schemaResult).toBe('object')
    return schemaResult
  }
  if (type === 'ZodPromise') {
    return Promise.resolve(empty(spec._def.type))
  }
  if (type === 'ZodEffects') {
    return empty(spec._def.schema)
  }
}
