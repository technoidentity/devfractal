import { assertType, describe, expect, expectTypeOf, test } from 'vitest'
import { chain } from '../chain'
import { filter, map, range, reduce } from '../iter'
import { inc, isEven, plus, squared } from '../operators'

describe('chain', () => {
  test('chain function', () => {
    expect(chain([], map(squared))).toEqual([])
    expect(chain(range(10), map(inc))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(
      chain(
        ['lorem', 'ipsum', 'emmet'],
        filter(word => word.length > 5),
      ),
    ).toEqual([])
    expect(chain([1, 2, 3, 4, 5], map(inc), filter(isEven))).toEqual([2, 4, 6])
  })

  test('chain function types', () => {
    expectTypeOf(
      chain([1, 2, 3, 4, 5], map(inc), filter(isEven)),
    ).toEqualTypeOf<number[]>()
    expectTypeOf(
      chain(
        ['lorem', 'ipsum', 'emmet'],
        filter(word => word.length > 5),
      ),
    ).toEqualTypeOf<string[]>()

    // @ts-expect-error reduce does not return iterable
    assertType<number>(() => chain([1, 2, 3, 4, 5], map(inc), reduce(plus, 0)))
  })
})
