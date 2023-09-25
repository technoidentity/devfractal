import { omap, pipe } from '@srtp/fn'
import { z } from 'zod'
import { toInt } from './spec'

function initialValuePrimitive(spec: z.ZodTypeAny) {
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

function initialValueCollection(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodArray) {
    return []
  }

  if (spec instanceof z.ZodTuple) {
    return spec._def.items.map(initialValue)
  }

  if (spec instanceof z.ZodObject) {
    return pipe(
      spec._def.shape(),
      omap(spec => initialValue(spec)),
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

function initialValueWrapper(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodOptional || spec instanceof z.ZodNullable) {
    return initialValue(spec._def.innerType)
  }

  if (spec instanceof z.ZodEffects) {
    return initialValue(spec._def.schema)
  }

  if (spec instanceof z.ZodDefault) {
    return spec._def.defaultValue()
  }

  if (spec instanceof z.ZodPromise) {
    return Promise.resolve(initialValue(spec._def.type))
  }

  if (spec instanceof z.ZodPipeline) {
    return initialValue(spec._def.in)
  }

  return undefined
}

function initialValueComposite(spec: z.ZodTypeAny) {
  if (spec instanceof z.ZodUnion) {
    const types = spec._def.options

    return initialValue(types[0])
  }
  if (spec instanceof z.ZodIntersection) {
    return {
      ...initialValue(spec._def.left),
      ...initialValue(spec._def.right),
    }
  }

  if (spec instanceof z.ZodDiscriminatedUnion) {
    const types = spec._def.options

    return initialValue(types[0])
  }

  return undefined
}

export function initialValue(spec: z.ZodTypeAny): z.infer<typeof spec> {
  if (spec instanceof z.ZodUndefined) {
    return undefined
  }

  if (spec instanceof z.ZodNull) {
    return null
  }

  if (spec instanceof z.ZodAny || spec instanceof z.ZodUnknown) {
    return initialValue(
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
    initialValuePrimitive(spec) ??
    initialValueCollection(spec) ??
    initialValueWrapper(spec) ??
    initialValueComposite(spec)

  if (result === undefined) {
    console.warn(`Unsupported type: ${spec._def.typeName}`)
  }

  return result
}
