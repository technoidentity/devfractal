import { z } from 'zod'
import { fakeString } from './fakeString'
import { fakeNumber } from './fakeNumber'
import { each, map, pipe, range, toArray } from '@srtp/fn'
import { faker } from '@faker-js/faker'

export function fake(spec: z.ZodTypeAny): any {
  const type = spec._def.typeName

  if (type === 'ZodString') {
    return fakeString(spec)
  }

  if (type === 'ZodNumber') {
    return fakeNumber(spec)
  }

  if (type === 'ZodBoolean') {
    return Math.floor(Math.random() * 2) === 0 ? true : false
  }

  // if (type === "ZodDate") {
  //   return fakeDate(spec);
  // }

  if (type === 'ZodLiteral') {
    return spec._def.value
  }

  if (type === 'ZodEnum') {
    const arr = Object.values(spec._def.values)
    return arr[Math.floor(Math.random() * arr.length)]
  }

  if (type === 'ZodArray') {
    const min: number =
      spec._def.maxLength === null ? 0 : spec._def.minLength.value
    const max: number =
      spec._def.minLength === null ? 10 : spec._def.maxLength.value

    return pipe(
      range(min, max),
      map(() => fake(spec._def.type)),
      toArray,
    )
  }

  if (type === 'ZodTuple') {
    return spec._def.items.map((s: z.ZodTypeAny) => fake(s))
  }

  if (type === 'ZodObject') {
    const shape = spec._def.shape()
    return Object.entries(shape).reduce((acc: any, [key, spec]: any) => {
      acc[key] = fake(spec)
      return acc
    }, {})
  }

  if (type === 'ZodRecord') {
    const size = Math.floor(Math.random() * 5) + 1
    const rec: any = {}
    pipe(
      range(0, size),
      each(() => {
        rec[fake(spec._def.keyType)] = fake(spec._def.valueType)
      }),
    )

    return rec
  }

  if (type === 'ZodMap') {
    const n = faker.number.int({
      min: 1,
      max: 10,
    })

    const map = new Map()
    pipe(
      range(0, n),
      each(() => {
        map.set(fake(spec._def.keyType), fake(spec._def.valueType))
      }),
    )

    return map
  }

  if (type === 'ZodSet') {
    const n = faker.number.int({
      min: 0,
      max: 10,
    })

    const set = new Set()
    pipe(
      range(0, n),
      each(() => set.add(fake(spec._def.valueType))),
    )

    return set
  }

  if (type === 'ZodUnion') {
    const types = spec._def.options
    const one = faker.number.int({ min: 0, max: types.length - 1 })

    return fake(types[one])
  }
  if (type === 'ZodIntersection') {
    return {
      ...fake(spec._def.left),
      ...fake(spec._def.right),
    }
  }

  if (type === 'ZodOptional' || type === 'ZodNullable') {
    return fake(spec._def.innerType)
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
    )
  }

  // if (type === "ZodEffects") {
  //   const effect = spec._def.effect;
  //   const val = fake(spec._def.schema);
  //   if (effect.type === "refine") {
  //
  //   }
  //   if (effect.type === "preprocess") {
  //
  //   }

  //   if (effect.type === "transform") {
  //     return effect.transform(val);
  //   }
}
