import { assertType, expectTypeOf, test } from 'vitest'
import { filter, map } from '../iter'
import { inc, isEven, plus } from '../operators'
import { chain } from '../chain'

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
  assertType<number>(() => chain([1, 2, 3, 4, 5], map(inc), reduce(plus, 0)))
})
