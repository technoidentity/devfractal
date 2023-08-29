import { assertType, expectTypeOf, test } from 'vitest'

import { chain } from '../chain'
import { filter, map, reduce } from '../iter'
import { inc, isEven, plus } from '../operators'

test('chain types', () => {
  expectTypeOf(chain([1, 2, 3, 4, 5], map(inc), filter(isEven))).toEqualTypeOf<
    number[]
  >()
  expectTypeOf(
    chain(
      ['lorem', 'ipsum', 'emmet'],
      filter(word => word.length > 5),
    ),
  ).toEqualTypeOf<string[]>()

  // @ts-expect-error reduce does not return iterable
  assertType(() => chain([1, 2, 3, 4, 5], map(inc), reduce(plus, 0)))
})
