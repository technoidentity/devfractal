/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { expect, test } from 'vitest'
import { max } from './simple'
import { Nat } from './specs'
import { isDefined } from '@srtp/spec'

test('max', () => {
  expect(max(1, 2, 3)).toBe(3)
  expect(max(3, 3, 1)).toBe(3)
  expect(max(3, 3, 3)).toBe(3)
})

export function groupBy<T, K extends string | number>(
  arr: Iterable<T>,
  f: (x: T) => K,
): Record<K, readonly T[]> {
  const result = {} as Record<K, readonly T[]>

  for (const v of arr) {
    const k = f(v)
    result[k] = isDefined(result[k]) ? [...result[k], v] : [v]
  }

  return result
}

export function* chunks<T>(
  arr: readonly T[],
  size: Nat,
): IterableIterator<T[]> {
  Nat.parse(size)

  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size)
  }
}
