/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable no-underscore-dangle */
import { each, map, omit$, pipe, range } from '@srtp/fn'
import Chance from 'chance'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const chance = new Chance()

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

const StringKind = z.enum([
  'sentence',
  'word',
  'paragraph',
  'email',
  'url',
  'phone',
  'uuid',
  'name',
])

type StringKind = z.infer<typeof StringKind>

const NumberKind = z.enum(['int', 'float'])
type NumberKind = z.infer<typeof NumberKind>

type FakeOptions = {
  ZodBoolean: Parameters<typeof chance.bool>[0]

  ZodNumber: Parameters<typeof chance.floating>[0] & {
    kind?: NumberKind
  }

  ZodString: Parameters<typeof chance.sentence>[0] & {
    kind?: StringKind
  }
  ZodDate: Parameters<typeof chance.date>[0]
  ZodArray: { min: number; max: number }
}

const defaultOptions: Partial<FakeOptions> = {
  ZodNumber: { min: 0, max: 100, fixed: 2 },
  ZodString: { words: 4 },
  ZodArray: { min: 0, max: 6 },
}

export type SupportedTypes = z.infer<typeof SupportedTypes>

function fakeNumber(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
): any {
  const opts = omit$(options.ZodNumber!, ['kind'])
  const kind = options.ZodNumber?.kind || spec._def.checks[0]?.kind
  switch (kind) {
    case 'int':
      return chance.integer(opts)
    default:
      return chance.floating(opts)
  }
}

function fakeString(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
): any {
  const opts = omit$(options.ZodNumber!, ['kind'])
  const kind = options.ZodNumber?.kind || spec._def.checks[0]?.kind

  switch (kind) {
    case 'sentence':
      return chance.sentence(opts)
    case 'word':
      return chance.word(opts)
    case 'paragraph':
      return chance.paragraph(opts)
    case 'email':
      return chance.email(opts)
    case 'url':
      return chance.url(opts)
    case 'phone':
      return chance.phone(opts)
    case 'name':
      return chance.name(opts)
    case 'uuid':
      return uuidv4()
    default:
      return chance.string(opts)
  }
}

export function fake(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
): any {
  const type: string = spec._def.typeName

  if (type === 'ZodString') {
    return fakeString(spec, options)
  }

  if (type === 'ZodNumber') {
    return fakeNumber(spec, options)
  }

  if (type === 'ZodBoolean') {
    return chance.bool(options.ZodBoolean)
  }

  if (type === 'ZodDate') {
    return options.ZodDate ? chance.date(options.ZodDate) : chance.date()
  }

  if (type === 'ZodLiteral') {
    return spec._def.value
  }

  if (type === 'ZodEnum') {
    return chance.pickone(Object.values(spec._def.values))
  }

  if (type === 'ZodArray') {
    const n = chance.integer({
      min: options.ZodArray?.min || 0,
      max: 10,
    })

    return pipe(
      range(0, n),
      map(() => fake(spec._def.type, options)),
    )
  }

  if (type === 'ZodTuple') {
    return spec._def.items.map((s: z.ZodTypeAny) => fake(s, options))
  }

  if (type === 'ZodObject') {
    const shape = spec._def.shape()
    return Object.entries(shape).reduce((acc: any, [key, spec]: any) => {
      acc[key] = fake(spec, options)
      return acc
    }, {})
  }

  if (type === 'ZodRecord') {
    const n = chance.integer({
      min: 0,
      max: options.ZodArray?.max || 10,
    })

    const rec: any = {}
    pipe(
      range(0, n),
      each(() => {
        rec[fake(spec._def.keyType, options)] = fake(
          spec._def.valueType,
          options,
        )
      }),
    )

    return rec
  }

  if (type === 'ZodMap') {
    const n = chance.integer({
      min: 1,
      max: 10,
    })

    const map = new Map()
    pipe(
      range(0, n),
      each(() => {
        map.set(
          fake(spec._def.keyType, options),
          fake(spec._def.valueType, options),
        )
      }),
    )

    return map
  }

  if (type === 'ZodSet') {
    const n = chance.integer({
      min: 0,
      max: 10,
    })

    const set = new Set()
    pipe(
      range(0, n),
      each(() => set.add(fake(spec._def.valueType, options))),
    )

    return set
  }

  if (type === 'ZodUnion') {
    const types = spec._def.options
    const one = chance.integer({ min: 0, max: types.length - 1 })

    return fake(types[one], options)
  }
  if (type === 'ZodIntersection') {
    return {
      ...fake(spec._def.left, options),
      ...fake(spec._def.right, options),
    }
  }

  if (type === 'ZodOptional' || type === 'ZodNullable') {
    return fake(spec._def.innerType, options)
  }

  if (type === 'ZodUndefined') {
    return undefined
  }

  if (type === 'ZodNull') {
    return null
  }

  if (type === 'ZodAny' || type === 'ZodUnknown') {
    return fake(
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.array(z.number()),
        z.object({ foo: z.string(), bar: z.boolean() }),
      ]),
      options,
    )
  }

  // @TODO: untested
  if (type === 'ZodEffects') {
    return fake(spec._def.schema, options)
  }

  console.warn(`Unsupported type: ${type}`)
}
