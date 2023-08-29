import { isEven, isOdd, pipe, plus, range, squared } from '@srtp/fn'
import { expect, test } from 'vitest'

import {
  deepFlatten,
  every,
  filter,
  find,
  findIndex,
  map,
  reduce,
  skipWhile,
  some,
  takeWhile,
} from './array'

test('map', () => {
  expect(
    pipe(
      [],
      map(x => x * x),
    ),
  ).toEqual([])
  expect(
    pipe(
      [1, 2, 3],
      map(x => x * x),
    ),
  ).toEqual([1, 4, 9])
})

test('filter', () => {
  expect(
    pipe(
      [],
      filter(x => x % 2 !== 0),
    ),
  ).toEqual([])
  expect(
    pipe(
      [1, 2, 3, 4, 5],
      filter(x => x % 2 !== 0),
    ),
  ).toEqual([1, 3, 5])
})

test('reduce', () => {
  expect(
    pipe(
      [],
      reduce((acc, x) => acc + x, 0),
    ),
  ).toEqual(0)
  expect(
    pipe(
      [1, 2, 3, 4, 5],
      reduce((acc, x) => acc + x, 0),
    ),
  ).toEqual(15)
})

test('findIndex', () => {
  expect(findIndex([1, 2, 3], 2)).toBe(1)
  expect(findIndex([1, 2, 3], 4)).toBe(-1)
  expect(findIndex([1, 2, 3], 2, 1)).toBe(1)
  expect(findIndex([1, 2, 3], 2, 2)).toBe(-1)
})

test('find', () => {
  expect(find([], x => x === 2)).toBe(-1)
  expect(find([1, 2, 3], x => x === 2)).toBe(1)
  expect(find([1, 2, 3], x => x === 4)).toBe(-1)
  expect(find([1, 2, 3], x => x === 2, 1)).toBe(1)
  expect(find([1, 2, 3], x => x === 2, 2)).toBe(-1)
})

test('some', () => {
  expect(some([], isOdd)).toBeFalsy()
  expect(some([1, 2, 3], isOdd)).toBeTruthy()
  expect(some([2, 4, 6], isOdd)).toBeFalsy()
})

test('every', () => {
  expect(every([], isEven)).toBeTruthy()
  expect(every([1, 2, 3], isEven)).toBeFalsy()
  expect(every([2, 4, 6], isEven)).toBeTruthy()
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

test('takeWhile', () => {
  const isEven = (x: number) => x % 2 === 0
  expect(takeWhile([], isEven)).toEqual([])
  expect(takeWhile([1], isEven)).toEqual([])
  expect(takeWhile([1, 3], isEven)).toEqual([])
  expect(takeWhile([2], isEven)).toEqual([2])
  expect(takeWhile([2, 4, 6], isEven)).toEqual([2, 4, 6])
  expect(takeWhile([2, 4, 5], isEven)).toEqual([2, 4])
  expect(takeWhile([2, 4, 5, 6, 7, 8], isEven)).toEqual([2, 4])
})

test('deepFlatten', () => {
  expect(
    deepFlatten([[], [0], [[10, 20], 30], 40, 50, [60, 70], 80, [90]]),
  ).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
})

test('array: basic', () => {
  const factorial = (n: number): number => {
    return pipe(
      [...range(1, n + 1)],
      reduce((acc, x) => acc * x, 1),
    )
  }

  expect(factorial(0)).toEqual(1)
  expect(factorial(1)).toEqual(1)
  expect(factorial(5)).toEqual(120)
})

test('array: advanced', () => {
  const result = pipe(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    filter(isOdd),
    map(squared),
    reduce(plus, 0),
  )

  expect(result).toBe(165)
})
