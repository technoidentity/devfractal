import { expect, expectTypeOf, test } from 'vitest'
import { chain } from '../chain'
import { filter, map, range } from '../iter'
import { inc, isEven, squared } from '../operators'

test('chain', () => {
  expect(chain([])).toEqual([])
  expect(chain([], map(squared))).toEqual([])
  expect(chain(range(10), map(inc))).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  expect(
    chain(
      ['lorem', 'ipsum', 'emmet'],
      filter(word => word.length > 5),
    ),
  ).toEqual([])
  expect(
    chain(
      range(4),
      map(e => [e, e * e]),
    ),
  ).toEqual([
    [0, 0],
    [1, 1],
    [2, 4],
    [3, 9],
  ])
  expect(chain([1, 2, 3, 4, 5], map(inc), filter(isEven))).toEqual([2, 4, 6])

  expectTypeOf(chain([1, 2, 3, 4, 5], map(inc), filter(isEven))).toEqualTypeOf<
    IterableIterator<number>[]
  >()
  expectTypeOf(
    chain(
      ['lorem', 'ipsum', 'emmet'],
      filter(word => word.length > 5),
    ),
  ).toEqualTypeOf<IterableIterator<string>[]>()
})
