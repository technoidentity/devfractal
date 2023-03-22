import { expect, test } from 'vitest'
import { arrayEqual } from './array'

test('arrayEqual', () => {
  expect(arrayEqual([], [])).toBe(true)
  expect(arrayEqual([1, 2, 3], [1, 2, 3])).toBe(true)
  expect(arrayEqual([1, 2], [1, 2])).toBe(true)
  expect(arrayEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  expect(arrayEqual([1, 2, 3], [1, 2])).toBe(false)
  expect(arrayEqual([1, 2], [1, 2, 3])).toBe(false)
  expect(arrayEqual([1, 2, 3], [1, 2, 3, 4])).toBe(false)
  expect(arrayEqual([1, 2, 3, 4], [1, 2, 3])).toBe(false)
})
