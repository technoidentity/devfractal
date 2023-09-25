/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable no-underscore-dangle */
import { faker } from '@faker-js/faker'
import { toInt } from '@srtp/core'
import { each, map, omap, omit$, pipe, range, toArray } from '@srtp/fn'
import { z } from 'zod'

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
  ZodBoolean: Parameters<typeof faker.datatype.boolean>[0]

  ZodNumber: Parameters<typeof faker.number.float>[0] & {
    kind?: NumberKind
  }

  ZodString: Parameters<typeof faker.string.alpha>[0] & {
    kind?: StringKind
  }
  ZodDate: Parameters<typeof faker.date.anytime>[0]
  ZodArray: { min: number; max: number }
}

const defaultOptions: Partial<FakeOptions> = {
  ZodNumber: { min: 0, max: 100, precision: 2, kind: 'int' },
  ZodString: { length: 10, kind: 'name' },
  ZodArray: { min: 0, max: 6 },
  ZodBoolean: 0.6,
}

export type SupportedTypes = z.infer<typeof SupportedTypes>

function fakeNumber(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
) {
  const opts = omit$(options.ZodNumber!, ['kind'])
  const kind = options.ZodNumber?.kind ?? spec._def.checks[0]?.kind
  switch (kind) {
    case 'int':
      return faker.number.int(opts)
    default:
      return faker.number.float(opts)
  }
}

function fakeString(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
) {
  const opts = omit$(options.ZodString!, ['kind'])
  const kind = spec._def.checks[0]?.kind || options.ZodString?.kind

  switch (kind) {
    case 'sentence':
      return faker.lorem.sentence()
    case 'word':
      return faker.lorem.word(opts)
    case 'paragraph':
      return faker.lorem.paragraph()
    case 'email':
      return faker.internet.email(opts)
    case 'url':
      return faker.internet.url(opts)
    case 'phone':
      return faker.phone.number()
    case 'name':
      return faker.person.fullName(opts)
    case 'uuid':
      return faker.string.uuid()
    default:
      return faker.string.alpha(opts)
  }
}

function fakePrimitive(spec: z.ZodTypeAny, options: Partial<FakeOptions>) {
  if (spec instanceof z.ZodString) {
    return fakeString(spec, options)
  }

  if (spec instanceof z.ZodNumber) {
    return fakeNumber(spec, options)
  }

  if (spec instanceof z.ZodBoolean) {
    return faker.datatype.boolean(options.ZodBoolean)
  }

  if (spec instanceof z.ZodDate) {
    return options.ZodDate
      ? faker.date.anytime(options.ZodDate)
      : faker.date.anytime()
  }

  if (spec instanceof z.ZodLiteral) {
    return spec._def.value
  }

  if (spec instanceof z.ZodEnum) {
    return faker.helpers.arrayElement(Object.values(spec._def.values))
  }

  if (spec instanceof z.ZodNativeEnum) {
    return toInt(faker.helpers.arrayElement(Object.keys(spec._def.values)))
  }

  return undefined
}

function fakeCollection(spec: z.ZodTypeAny, options: Partial<FakeOptions>) {
  if (spec instanceof z.ZodArray) {
    const n = faker.number.int({
      min: options.ZodArray?.min ?? 0,
      max: 10,
    })

    return pipe(
      range(0, n),
      map(() => fake(spec._def.type, options)),
      toArray,
    )
  }

  if (spec instanceof z.ZodTuple) {
    return spec._def.items.map((s: z.ZodTypeAny) => fake(s, options))
  }

  if (spec instanceof z.ZodObject) {
    return pipe(
      spec._def.shape(),
      omap(spec => fake(spec, options)),
    )
  }

  if (spec instanceof z.ZodRecord) {
    const n = faker.number.int({
      min: 0,
      max: options.ZodArray?.max ?? 10,
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

  if (spec instanceof z.ZodMap) {
    const n = faker.number.int({
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

  if (spec instanceof z.ZodSet) {
    const n = faker.number.int({
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

  return undefined
}

function fakeWrapper(spec: z.ZodTypeAny, options: Partial<FakeOptions>) {
  if (spec instanceof z.ZodOptional || spec instanceof z.ZodNullable) {
    return fake(spec._def.innerType, options)
  }

  if (spec instanceof z.ZodEffects) {
    return fake(spec._def.schema, options)
  }

  if (spec instanceof z.ZodDefault) {
    return fake(spec._def.innerType, options)
  }

  if (spec instanceof z.ZodPromise) {
    return Promise.resolve(fake(spec._def.type, options))
  }

  if (spec instanceof z.ZodPipeline) {
    return fake(spec._def.in, options)
  }

  return undefined
}

function fakeComposite(spec: z.ZodTypeAny, options: Partial<FakeOptions>) {
  if (spec instanceof z.ZodUnion) {
    const types = spec._def.options
    const one = faker.number.int({ min: 0, max: types.length - 1 })

    return fake(types[one], options)
  }
  if (spec instanceof z.ZodIntersection) {
    return {
      ...fake(spec._def.left, options),
      ...fake(spec._def.right, options),
    }
  }

  if (spec instanceof z.ZodDiscriminatedUnion) {
    const types = spec._def.options
    const one = faker.number.int({ min: 0, max: types.length - 1 })

    return fake(types[one], options)
  }

  return undefined
}

export function fake(
  spec: z.ZodTypeAny,
  options: Partial<FakeOptions> = defaultOptions,
): z.infer<typeof spec> {
  if (spec instanceof z.ZodUndefined) {
    return undefined
  }

  if (spec instanceof z.ZodNull) {
    return null
  }

  if (spec instanceof z.ZodAny || spec instanceof z.ZodUnknown) {
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

  const result =
    fakePrimitive(spec, options) ??
    fakeCollection(spec, options) ??
    fakeWrapper(spec, options) ??
    fakeComposite(spec, options)

  if (result === undefined) {
    console.warn(`Unsupported type: ${spec._def.typeName}`)
  }

  return result
}
