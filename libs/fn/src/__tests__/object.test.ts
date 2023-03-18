/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { expect, test } from 'vitest'
import { mergeWith, omit, omitBy, pick, pickBy } from '../object'

test('mergeWith', () => {
  expect(mergeWith({ a: 1, b: 2 }, { a: 9, b: 98 }, (x, y) => x + y)).toEqual({
    a: 10,
    b: 100,
  })
  expect(
    mergeWith({ a: 1, b: 2 }, { a: 3, b: 5, c: 0 }, (x, y) => x + y),
  ).toEqual({
    a: 4,
    b: 7,
    c: 0,
  })
  expect(
    mergeWith({ a: 1, b: 2, c: 3 }, { a: 3, b: 5 }, (x, y) => x + y),
  ).toEqual({
    a: 4,
    b: 7,
    c: 3,
  })
  expect(mergeWith({ a: 1, d: 2 }, { a: 3, c: 5 }, (x, y) => x + y)).toEqual({
    a: 4,
    c: 5,
    d: 2,
  })
  expect(mergeWith({ a: 1, d: 2 }, { a: 3, c: 5 }, (x, y) => [x, y])).toEqual({
    a: [1, 3],
    c: 5,
    d: 2,
  })
  expect(mergeWith({}, {}, (x, y) => x + y)).toEqual({})
  expect(mergeWith({ a: 1 }, { b: 2 }, (x, y) => x + y)).toEqual({ a: 1, b: 2 })
  expect(mergeWith({ a: 1 }, {}, (x, y) => x + y)).toEqual({ a: 1 })
  expect(mergeWith({}, { b: 2 }, (x, y) => x + y)).toEqual({ b: 2 })
})

const obj = { a: 1, b: '2', c: 3, d: 'hello', e: null }
const emptyObj = {}
// test case for pick function
test('pick', () => {
  expect(pick(obj, ['a'])).toEqual({ a: 1 })
  expect(pick(obj, ['a', 'b', 'c'])).toEqual({ a: 1, b: '2', c: 3 })
  expect(pick(obj, [])).toEqual({})
  expect(pick(obj, ['unknownKey'] as any)).toEqual({})
  expect(pick(emptyObj, ['a'] as any)).toEqual({})
})

// test case for pickBy function
test('pickBy', () => {
  expect(pickBy(obj, isNaN)).toEqual({ d: 'hello' })
  expect(pickBy(obj, isFinite)).toEqual({ a: 1, b: '2', c: 3, e: null })
  expect(pickBy(emptyObj, isNaN)).toEqual({})
})

// test case for omit function
test('omit', () => {
  expect(omit(obj, ['a'])).toEqual({ b: '2', c: 3, d: 'hello', e: null })
  expect(omit(obj, ['a', 'c'])).toEqual({ b: '2', d: 'hello', e: null })
  expect(omit(obj, ['a', 'd', 'e'])).toEqual({ b: '2', c: 3 })
  expect(omit(emptyObj, ['a'] as any)).toEqual({})
  expect(omit(obj, [])).toEqual({ a: 1, b: '2', c: 3, d: 'hello', e: null })
  expect(omit(obj, ['unknownKey'] as any)).toEqual({
    a: 1,
    b: '2',
    c: 3,
    d: 'hello',
    e: null,
  })
})

// test case for omitBy function
test('omitBy', () => {
  expect(omitBy(obj, isNaN)).toEqual({ a: 1, b: '2', c: 3, e: null })
  expect(omitBy(obj, isFinite)).toEqual({ d: 'hello' })
  expect(omitBy(emptyObj, isFinite)).toEqual({})
})

// test case for pluck function
// const array = [
//   { name: 'jack', age: 14 },
//   { name: 'jill', age: '15' },
//   { name: 'Hoo', age: 16 },
// ]
// const emptyArr: Record<string, any>[] = []

// test('pluck', () => {
//   expect(pluck(array, ['name', 'age'])).toEqual([
//     { name: 'jack', age: 14 },
//     { name: 'jill', age: '15' },
//     { name: 'Hoo', age: 16 },
//   ])

//   expect(pluck(array, ['age'])).toEqual([
//     { age: 14 },
//     { age: '15' },
//     { age: 16 },
//   ])
//   expect(pluck(emptyArr, ['age'])).toEqual([])
//   expect(pluck(array, [''] as any)).toEqual([{}, {}, {}])
//   expect(pluck(array, ['unknownKey'] as any)).toEqual([{}, {}, {}])
// })
