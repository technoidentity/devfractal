import { describe, test, expectTypeOf, expect } from 'vitest'
import { z } from 'zod'
import { empty } from './empty'

describe('empty value', () => {
  test('primitives', () => {
    expect(empty(z.number())).toBe(0)
    expect(empty(z.string())).toBe('')
    expect(empty(z.boolean())).toBe(false)
    expect(empty(z.array(z.number()))).toEqual([])
    expect(
      empty(
        z.tuple([z.number(), z.string(), z.object({ isValid: z.boolean() })]),
      ),
    ).toEqual([0, '', { isValid: false }])
    expect(empty(z.object({ name: z.string(), phone: z.number() }))).toEqual({
      name: '',
      phone: 0,
    })
    expect(empty(z.set(z.number()))).toEqual(new Set<number>())
    expect(empty(z.map(z.string(), z.number()))).toEqual(
      new Map<string, number>(),
    )
    expect(empty(z.enum(['first', 'second']))).toEqual(['first', 'second'])
    expect(
      empty(
        z.intersection(
          z.object({ x: z.number() }),
          z.object({ y: z.string() }),
        ),
      ),
    ).toEqual({ x: 0, y: '' })
  })
})
test('types', () => {
  expectTypeOf(empty(z.number().array())).toMatchTypeOf<number[]>()
  expectTypeOf(empty(z.string().array())).toMatchTypeOf<string[]>()
  expectTypeOf(empty(z.boolean().array())).toMatchTypeOf<boolean[]>()
  expectTypeOf(
    empty(z.array(z.object({ x: z.number(), y: z.boolean() }))),
  ).toMatchTypeOf<object[]>()
  expectTypeOf(
    empty(z.tuple([z.number(), z.number(), z.string()])),
  ).toMatchTypeOf<[number, number, string]>()
  expectTypeOf(empty(z.set(z.number()))).toMatchTypeOf<Set<number>>()
  expectTypeOf(empty(z.map(z.number(), z.string()))).toMatchTypeOf<
    Map<number, string>
  >()
  expectTypeOf(empty(z.record(z.string(), z.array(z.number())))).toMatchTypeOf<
    Record<string, number[]>
  >()
  expectTypeOf(empty(z.union([z.string(), z.number()]))).toMatchTypeOf<
    string | number
  >()
  expectTypeOf(
    empty(
      z.intersection(
        z.object({ name: z.string() }),
        z.object({ phone: z.number() }),
      ),
    ),
  ).toMatchTypeOf<{ name: string; phone: number }>()
  expectTypeOf(empty(z.optional(z.string()))).toMatchTypeOf<
    string | undefined
  >()
  expectTypeOf(empty(z.nullable(z.string()))).toMatchTypeOf<string | null>()
  expectTypeOf(empty(z.string().default(''))).toMatchTypeOf<string>()
  expectTypeOf(empty(z.any())).toMatchTypeOf<
    string | number | boolean | number[] | { foo: string; bar: boolean }
  >()
  expectTypeOf(empty(z.unknown())).toMatchTypeOf<
    string | number | boolean | number[] | { foo: string; bar: boolean }
  >()
})
test('nested object', () => {
  const simpleObj = z.object({
    path: z.string(),
    segment: z.tuple([z.number()]),
    id: z.number(),
  })

  const schema = {
    value: z.number(),
    isActive: z.boolean(),
    connect: simpleObj,
    requests: simpleObj.array(),
  }
  expect(empty(z.object(schema))).toEqual({
    value: 0,
    isActive: false,
    connect: {
      path: '',
      segment: [0],
      id: 0,
    },
    requests: [],
  })
})
