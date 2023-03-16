/* eslint-disable @typescript-eslint/naming-convention */
import { expect, test } from 'vitest'
import { chunks } from './chunks'
import { deepFlatten } from './deepFlatten'
import { groupBy } from './groupBy'
import { maxBy } from './maxBy'
import { skipWhile } from './skipWhile'
import { zip } from './zip'

test('zip', () => {
  expect(zip([1, 2], [3, 4], [5, 6, 7])).toEqual([
    [1, 3, 5],
    [2, 4, 6],
  ])
  expect(zip([1, 2], [3, 4], [5, 6])).toEqual([
    [1, 3, 5],
    [2, 4, 6],
  ])
  expect(zip([1, 2], [3, 4])).toEqual([
    [1, 3],
    [2, 4],
  ])
  expect(zip([1, 2, 3])).toEqual([[1], [2], [3]])
  expect(zip([1])).toEqual([[1]])
  expect(zip([])).toEqual([])
})

test('groupBy', () => {
  expect(
    groupBy(['1.2', '1.4', '2.4', '2.7', '3'], x => Math.floor(+x)),
  ).toEqual({
    1: ['1.2', '1.4'],
    2: ['2.4', '2.7'],
    3: ['3'],
  })
})

test('skipWhile', () => {
  const isEven = (x: number) => x % 2 === 0
  expect(skipWhile([], isEven)).toEqual([])
  expect(skipWhile([1], isEven)).toEqual([1])
  expect(skipWhile([1, 3], isEven)).toEqual([1, 3])
  expect(skipWhile([2], isEven)).toEqual([])
  expect(skipWhile([2, 4, 6], isEven)).toEqual([])
  expect(skipWhile([2, 4, 5], isEven)).toEqual([5])
  expect(skipWhile([2, 4, 5, 6, 7, 8], isEven)).toEqual([5, 6, 7, 8])
})

test('deepFlatten', () => {
  expect(
    deepFlatten([[], [0], [[10, 20], 30], 40, 50, [60, 70], 80, [90]]),
  ).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
})

test('chunks', () => {
  expect(chunks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10],
  ])
  expect(chunks([1, 2, 3, 4, 5, 6, 7, 8, 9], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
  expect(chunks([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8],
  ])
  expect(chunks([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]])
  expect(chunks([1, 2, 3, 4, 5, 6], 3)).toEqual([
    [1, 2, 3],
    [4, 5, 6],
  ])
  expect(chunks([1, 2, 3, 4, 5], 3)).toEqual([
    [1, 2, 3],
    [4, 5],
  ])
  expect(chunks([1, 2, 3, 4], 3)).toEqual([[1, 2, 3], [4]])
  expect(chunks([1, 2, 3], 3)).toEqual([[1, 2, 3]])
  expect(chunks([1, 2], 3)).toEqual([[1, 2]])
  expect(chunks([1], 3)).toEqual([[1]])
  expect(chunks([], 3)).toEqual([])
})

test('maxBy', () => {
  expect(
    maxBy([{ x: 1 }, { x: 3 }, { x: 2 }, { x: 4 }, { x: 0 }, { x: -1 }], 'x'),
  ).toEqual({ x: 4 })

  expect(
    maxBy([{ x: 1 }, { x: 3 }, { x: 2 }, { x: 0 }, { x: -1 }, { x: 4 }], 'x'),
  ).toEqual({ x: 4 })

  expect(
    maxBy([{ x: 4 }, { x: 1 }, { x: 3 }, { x: 2 }, { x: 0 }, { x: -1 }], 'x'),
  ).toEqual({ x: 4 })

  expect(maxBy([{ x: 1 }, { x: 3 }, { x: 2 }], 'x')).toEqual({ x: 3 })
  expect(maxBy([{ x: 1 }, { x: 3 }], 'x')).toEqual({ x: 3 })
  expect(maxBy([{ x: 1 }], 'x')).toEqual({ x: 1 })
  expect(() => maxBy([], 'x')).toThrow()
})
