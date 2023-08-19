import { describe, expectTypeOf, test } from 'vitest'

describe('type tests example', () => {
  test('simple', () => {
    expectTypeOf<string>().toEqualTypeOf<string>()

    const foo = () => 'foo' as const

    expectTypeOf(foo).toEqualTypeOf<() => 'foo'>()

    // @ts-expect-error return type shouldn't be string
    expectTypeOf(foo()).toEqualTypeOf<string>()
  })
})
