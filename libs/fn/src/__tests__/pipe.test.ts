import { describe, expect, expectTypeOf, test } from 'vitest'

import { filter, map, range, reduce, toArray } from '../iter'
import { inc, isEven, plus, squared } from '../operators'
import { pipe } from '../pipe'

describe('pipe', () => {
  test('pipe function', () => {
    expect(toArray(pipe([], map(squared)))).toEqual([])
    expect(toArray(pipe(range(10), map(inc)))).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ])
    expect(
      toArray(
        pipe(
          ['lorem', 'ipsum', 'emmet'],
          filter(word => word.length > 5),
        ),
      ),
    ).toEqual([])
    expect(toArray(pipe([1, 2, 3, 4, 5], map(inc), filter(isEven)))).toEqual([
      2, 4, 6,
    ])
    expect(
      pipe([1, 2, 3, 4, 5], map(inc), filter(isEven), reduce(plus, 0)),
    ).toEqual(12)
  })
})

test('pipe function types', () => {
  expectTypeOf(pipe([1, 2, 3, 4, 5], map(inc), filter(isEven))).toEqualTypeOf<
    IterableIterator<number>
  >()
  expectTypeOf(
    pipe([1, 2, 3, 4, 5], map(inc), filter(isEven), reduce(plus, 0)),
  ).toEqualTypeOf<number>()
  expectTypeOf(
    pipe(
      ['lorem', 'ipsum', 'emmet'],
      filter(word => word.length > 5),
    ),
  ).toEqualTypeOf<IterableIterator<string>>()
})
