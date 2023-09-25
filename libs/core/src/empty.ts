import { omap, pipe } from '@srtp/fn'
import { z } from 'zod'
import { toInt } from './spec'

function emptyPrimitive(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodString) {
    return ''
  }

  if (spec instanceof z.ZodNumber) {
    return 0
  }

  if (spec instanceof z.ZodBoolean) {
    return false
  }

  if (spec instanceof z.ZodDate) {
    return new Date()
  }

  if (spec instanceof z.ZodLiteral) {
    return spec._def.value
  }

  if (spec instanceof z.ZodEnum) {
    return Object.values(spec._def.values)[0]
  }

  if (spec instanceof z.ZodNativeEnum) {
    return toInt(Object.keys(spec._def.values)[0])
  }

  return undefined
}

function emptyCollection(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodArray) {
    return []
  }

  if (spec instanceof z.ZodTuple) {
    return spec._def.items.map(empty)
  }

  if (spec instanceof z.ZodObject) {
    return pipe(
      spec._def.shape(),
      omap(spec => empty(spec)),
    )
  }

  if (spec instanceof z.ZodRecord) {
    return {}
  }

  if (spec instanceof z.ZodMap) {
    return new Map()
  }

  if (spec instanceof z.ZodSet) {
    return new Set()
  }

  return undefined
}

function emptyWrapper(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodOptional || spec instanceof z.ZodNullable) {
    return empty(spec._def.innerType)
  }

  if (spec instanceof z.ZodEffects) {
    return empty(spec._def.schema)
  }

  if (spec instanceof z.ZodDefault) {
    return spec._def.defaultValue()
  }

  if (spec instanceof z.ZodPromise) {
    return Promise.resolve(empty(spec._def.type))
  }

  if (spec instanceof z.ZodPipeline) {
    return empty(spec._def.in)
  }

  return undefined
}

function emptyComposite(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodUnion) {
    const types = spec._def.options

    return empty(types[0])
  }
  if (spec instanceof z.ZodIntersection) {
    return {
      ...empty(spec._def.left),
      ...empty(spec._def.right),
    }
  }

  if (spec instanceof z.ZodDiscriminatedUnion) {
    const types = spec._def.options

    console.log(types[0]._def.typeName)

    return empty(types[0])
  }

  return undefined
}

export function empty(spec: z.ZodTypeAny): z.infer<typeof spec> {
  if (spec instanceof z.ZodUndefined) {
    return undefined
  }

  if (spec instanceof z.ZodNull) {
    return null
  }

  if (spec instanceof z.ZodAny || spec instanceof z.ZodUnknown) {
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

  const result =
    emptyPrimitive(spec) ??
    emptyCollection(spec) ??
    emptyWrapper(spec) ??
    emptyComposite(spec)

  if (result === undefined) {
    console.warn(`Unsupported type: ${spec._def.typeName}`)
  }

  return result
}
