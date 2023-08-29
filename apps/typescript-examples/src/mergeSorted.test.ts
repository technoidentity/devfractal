import { expect, test } from 'vitest'

import { mergeSorted } from './mergeSorted'

test('mergeSorted', () => {
  expect([...mergeSorted([], [])]).toEqual([])
  expect([...mergeSorted([1], [])]).toEqual([1])
  expect([...mergeSorted([], [1])]).toEqual([1])
  expect([...mergeSorted([1], [2])]).toEqual([1, 2])
  expect([...mergeSorted([2], [1])]).toEqual([1, 2])
  expect([...mergeSorted([1, 3], [2])]).toEqual([1, 2, 3])
  expect([...mergeSorted([1, 3], [2, 4])]).toEqual([1, 2, 3, 4])
  expect([...mergeSorted([1, 3, 5], [2, 4])]).toEqual([1, 2, 3, 4, 5])
  expect([...mergeSorted([1, 3, 5], [2, 4, 6])]).toEqual([1, 2, 3, 4, 5, 6])
  expect([...mergeSorted([1, 3, 5, 7], [2, 4, 6])]).toEqual([
    1, 2, 3, 4, 5, 6, 7,
  ])
  expect([...mergeSorted([1, 3, 5, 7], [2, 4, 6, 8])]).toEqual([
    1, 2, 3, 4, 5, 6, 7, 8,
  ])
})
