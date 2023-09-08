import { describe, test, expectTypeOf, expect } from 'vitest'
import { z } from 'zod'
import { empty } from './empty'

describe('empty value', () => {
  test('primitives', () => {
    expect(empty(z.number())).toBe(0)
    expect(empty(z.string())).toBe('')
    expect(empty(z.boolean())).toBe(false)
  })
  test('array', () => {
    expectTypeOf(empty(z.number().array())).toMatchTypeOf<number[]>()
    expectTypeOf(empty(z.string().array())).toMatchTypeOf<string[]>()
    expectTypeOf(empty(z.boolean().array())).toMatchTypeOf<boolean[]>()
    expect(empty(z.number().array())).toEqual([])
  })
  test('object', () => {
    const Foo = z.object({ x: z.number(), y: z.string(), z: z.boolean() })
    expect(empty(Foo)).toEqual({ x: 0, y: '', z: false })
    //   expectTypeOf(
    //     empty(
    //       z.array(z.object({ x: z.number(), y: z.string(), z: z.boolean() })),
    //     ),
    //   ).toMatchTypeOf<Array<z.number, z.string, z.boolean>[]>()
  })
  test('nested object', () => {
    const simpleObj = z.object({
      path: z.string(),
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
        id: 0,
      },
      requests: [],
    })
  })
})
