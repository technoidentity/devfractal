import { expect, test } from 'vitest'
import { isSorted } from './isSorted'

test('isSorted', () => {
  expect(isSorted([])).toBe(true)
  expect(isSorted([1])).toBe(true)
  expect(isSorted([1, 2])).toBe(true)
  expect(isSorted([2, 1])).toBe(false)
  expect(isSorted([1, 2, 3])).toBe(true)
  expect(isSorted([1, 3, 2])).toBe(false)
  expect(isSorted([1, 2, 3, 4])).toBe(true)
  expect(isSorted([1, 2, 4, 3])).toBe(false)
  expect(isSorted([1, 2, 3, 4, 5])).toBe(true)
})
