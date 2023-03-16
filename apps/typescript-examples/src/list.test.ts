import { expect, test } from 'vitest'
import {
  cons,
  fcons,
  filter,
  fromArray,
  head,
  iter,
  list,
  map,
  nil,
  reduce,
  tail,
  toArray,
} from './list'

test('fromArray,toArray', () => {
  expect(fromArray([])).toEqual(nil)
  const list = cons(1, fcons(2, fcons(3, nil)))
  const expected = toArray(fromArray([1, 2, 3]))
  const actual = toArray(list)
  expect(expected).toEqual(actual)
})

test('map', () => {
  expect(map(x => x, nil)).toEqual(nil)
  expect(toArray(map(x => x * x, cons(1, fcons(2, fcons(3, nil)))))).toEqual([
    1, 4, 9,
  ])
})

test('filter', () => {
  expect(filter(_ => true, nil)).toEqual(nil)
  expect(
    toArray(filter(x => x % 2 === 0, fromArray([1, 2, 3, 4, 5, 6]))),
  ).toEqual([2, 4, 6])
})

test('reduce', () => {
  expect(reduce((_, _x) => 0, 100, nil)).toEqual(100)
  expect(reduce((x, y) => x + y, 0, fromArray([1, 2, 3, 4, 5]))).toBe(15)
})

test('iter', () => {
  expect([...iter(fromArray([]))]).toEqual([])
  expect([...iter(fromArray([1, 2, 3, 4, 5]))]).toEqual([1, 2, 3, 4, 5])
})

test('head', () => {
  expect(head(nil)).toBeUndefined()
  expect(head(cons(1, nil))).toBe(1)
})

test('tail', () => {
  expect(tail(nil)).toBe(nil)
  expect(tail(cons(1, nil))).toBe(nil)
  expect(toArray(tail(list(1, 2)))).toEqual([2])
  expect(toArray(tail(list(1, 2, 3)))).toEqual([2, 3])
})
