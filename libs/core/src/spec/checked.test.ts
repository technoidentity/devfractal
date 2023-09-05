import { expect, expectTypeOf, test } from 'vitest'

import { string, z } from 'zod'
import { checked } from './checked'
import { Natural } from './commonSpecs'

const add = checked([Natural, Natural], (a, b) => a + b)
const times = checked([Natural.max(3), string()], (n, str) => str.repeat(n))

const add2 = checked(
  [z.union([z.number(), z.string()]), z.number()],
  (a, b) => [a, b] as const,
)

const foo = checked(
  [z.intersection(z.object({ a: z.string() }), z.object({ b: z.number() }))],
  x => x,
)

test('checked', () => {
  expect(() => add('hello' as any, 10)).toThrow()
  expect(() => add(10, 'hello' as any)).toThrow()
  expect(() => add(10, -1)).toThrow()
  expect(() => add(-10, 1)).toThrow()
  expect(() => add(10.6, 1)).toThrow()
  expect(() => add(1, 10.6)).toThrow()
  expect(add(10, 20)).toBe(30)

  expect(() => times(-1, 'hello')).toThrow()
  expect(() => times(10, 10 as any)).toThrow()
  expect(() => times(4, 'hello')).toThrow()
  expect(times(3, 'hello')).toBe('hellohellohello')

  expectTypeOf<typeof add2>().toEqualTypeOf<
    (x: string | number, y: number) => readonly [string | number, number]
  >()

  expectTypeOf<typeof foo>().toEqualTypeOf<
    (x: { a: string } & { b: number }) => { a: string } & { b: number }
  >()
})
