/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  assignWith,
  drop,
  dropWhile,
  groupBy,
  insertAt,
  join,
  leftOuterJoin,
  max,
  maxBy,
  maxIndex,
  min,
  minBy,
  minIndex,
  orderBy,
  range,
  removeAt,
  replaceAt,
  rightOuterJoin,
  sortedUnique,
  take,
  takeWhile,
  uniq,
  zip,
  zipWith,
} from '../array'

import { expect, it, test } from 'vitest'

test('take', () => {
  expect(uniq([2, 1, 2])).toEqual([2, 1])
  expect(uniq(['a', 1, 'a', 2, '1'])).toEqual(['a', 1, 2, '1'])
  expect(uniq([false, true, true, false, 0, 1, 's', 1])).toEqual([
    false,
    true,
    0,
    1,
    's',
  ])
  expect(uniq([])).toEqual([])
  expect(uniq([1])).toEqual([1])
  expect(uniq([1, 1, 0, 0, '', ''])).toEqual([1, 0, ''])
})

test('range', () => {
  expect(uniq([2, 1, 2])).toEqual([2, 1])
  expect(uniq(['a', 1, 'a', 2, '1'])).toEqual(['a', 1, 2, '1'])
  expect(uniq([false, true, true, false, 0, 1, 's', 1])).toEqual([
    false,
    true,
    0,
    1,
    's',
  ])
  expect(uniq([])).toEqual([])
  expect(uniq([1])).toEqual([1])
  expect(uniq([1, 1, 0, 0, '', ''])).toEqual([1, 0, ''])
})

test('take', () => {
  expect(take([2, 1, 2], 2)).toEqual([2, 1])
  expect(take(['a', 1, 'a', 2, '1'], 5)).toEqual(['a', 1, 'a', 2, '1'])
  expect(take([1, 2, 3])).toEqual([1])
  expect(take([1, 2, 3], 5)).toEqual([1, 2, 3])
  expect(take([1, 2, 3], 0)).toEqual([])
  expect(take([], 0)).toEqual([])
  expect(take([1], 2)).toEqual([1])
  expect(take([1], 0)).toEqual([])
})

test('drop', () => {
  expect(drop([1, 2, 3])).toEqual([2, 3])
  expect(drop([1, 2, 3], 2)).toEqual([3])
  expect(drop([1, 2, 3], 5)).toEqual([])
  expect(drop([1, 2, 3], 0)).toEqual([1, 2, 3])
  expect(drop([], 0)).toEqual([])
  expect(drop([1], 0)).toEqual([1])
  expect(drop([1], 2)).toEqual([])
})

test('min', () => {
  expect(min([3, 6, 8, 1, 2, 9])).toEqual(1)
  expect(min([99, 66, 108, 56, 24, 88])).toEqual(24)
  expect(min([-1, -4, 0, 1, 3])).toEqual(-4)
  expect(min([1])).toEqual(1)
  expect(() => min([])).toThrow()
})

test('max', () => {
  expect(max([3, 6, 8, 1, 2, 9])).toEqual(9)
  expect(max([99, 66, 108, 56, 24, 88])).toEqual(108)
  expect(max([-1, -4, 0, 1, 3])).toEqual(3)
  expect(max([1])).toEqual(1)
  expect(() => max([])).toThrow()
})

test('zip', () => {
  expect(zip([1, 2, 3], ['a', 'b'])).toEqual([
    [1, 'a'],
    [2, 'b'],
  ])
  expect(zip([1, 2, 3], ['a', 'b', 'c', 'd', 'e'])).toEqual([
    [1, 'a'],
    [2, 'b'],
    [3, 'c'],
  ])
  expect(zip([1, 2], ['a', 'b'])).toEqual([
    [1, 'a'],
    [2, 'b'],
  ])
  expect(zip([1], ['a'])).toEqual([[1, 'a']])
  expect(zip([], [])).toEqual([])
})

test('takeWhile', () => {
  expect(takeWhile([2, 4, 9, 8], x => x % 2 === 0)).toEqual([2, 4])
  expect(takeWhile([2, 4, 9, 8], x => x % 3 === 0)).toEqual([])
  expect(takeWhile([1, 2, 3, 7, 4, 5], x => x < 5)).toEqual([1, 2, 3])
  expect(takeWhile([2, 4, 8], x => x % 2 === 0)).toEqual([2, 4, 8])
  expect(takeWhile([], x => x % 2 === 0)).toEqual([])
})

test('dropWhile', () => {
  expect(dropWhile([2, 4, 9, 8], x => x % 2 === 0)).toEqual([9, 8])
  expect(dropWhile([2, 4, 9, 8], x => x % 3 === 0)).toEqual([2, 4, 9, 8])
  expect(dropWhile([1, 2, 3, 7, 4, 5], x => x < 5)).toEqual([7, 4, 5])
  expect(dropWhile([2, 4, 8], x => x % 2 === 0)).toEqual([])
  expect(dropWhile([], x => x % 2 === 0)).toEqual([])
})

test('minIndex', () => {
  expect(minIndex([3, 6, 8, 1, 2, 9])).toEqual(3)
  expect(minIndex([99, 66, 108, 56, 24, 88])).toEqual(4)
  expect(minIndex([-1, -4, 0, 1, 3])).toEqual(1)
  expect(minIndex([1])).toEqual(0)
  expect(() => minIndex([])).toThrow()
})

test('maxIndex', () => {
  expect(maxIndex([3, 6, 8, 1, 2, 9])).toEqual(5)
  expect(maxIndex([99, 66, 108, 56, 24, 88])).toEqual(2)
  expect(maxIndex([-1, -4, 0, 1, 3])).toEqual(4)
  expect(maxIndex([1])).toEqual(0)
  expect(() => maxIndex([])).toThrow()
})

const objects = [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 0 }]

test('minBy', () => {
  expect(minBy([9, 3, 5, 8, 2, 4], x => x % 3)).toEqual(9)
  expect(minBy([3, 6, 8, 1, 2, 9], x => x + 3)).toEqual(1)
  expect(minBy(objects, x => x.n)).toEqual({ n: 0 })
  expect(minBy([4], x => x % 3)).toEqual(4)
  expect(() => minBy([], x => x % 3)).toThrow()
})

test('maxBy', () => {
  expect(maxBy([9, 3, 5, 8, 2, 4], x => x % 3)).toEqual(5)
  expect(maxBy([3, 6, 8, 1, 2, 9], x => x + 3)).toEqual(9)
  expect(maxBy(objects, x => x.n)).toEqual({ n: 3 })
  expect(maxBy([4], x => x % 3)).toEqual(4)
  expect(() => maxBy([], x => x % 3)).toThrow()
})

test('zipWith', () => {
  expect(zipWith([1, 2], [10, 20], (x, y) => x + y)).toEqual([11, 22])
  expect(zipWith([1, 2], [10, 20], (x, y) => x * y)).toEqual([10, 40])
  expect(zipWith([1, 2], [10, 20], (x, y) => x - y)).toEqual([-9, -18])
  expect(zipWith([1, 2, 3], [10, 20, 30], (x, y) => x + y)).toEqual([
    11, 22, 33,
  ])
  expect(zipWith([], [], (x, y) => x + y)).toEqual([])
})

test('sortedUnique', () => {
  expect(sortedUnique(['237', '124', '255', '124', '366', '255'])).toEqual([
    '124',
    '237',
    '255',
    '366',
  ])
  expect(sortedUnique([237, 124, 255, 124, 366, 255])).toEqual([
    124, 237, 255, 366,
  ])
  // expect(sortedUnique([-7, -7, -8, -3, -3, -6, -2, -4, -4])).toEqual([
  //   -2, -3, -4, -6, -7, -8,
  // ])
  expect(sortedUnique([])).toEqual([])
})

test('assignWith', () => {
  expect(assignWith({ a: 1, b: 2 }, { a: 9, b: 98 }, (x, y) => x + y)).toEqual({
    a: 10,
    b: 100,
  })
  expect(assignWith({}, {}, (x, y) => x + y)).toEqual({})
  expect(assignWith({ a: 1, b: 2 }, {}, (x, y) => x + y)).toEqual({
    a: 1,
    b: 2,
  })
  expect(assignWith({ a: 1, b: 2 }, { a: 9 }, (x, y) => x + y)).toEqual({
    a: 10,
    b: 2,
  })
  expect(assignWith({ a: 1, b: 2 }, { a: 9, b: 98 }, (x, y) => [x, y])).toEqual(
    {
      a: [1, 9],
      b: [2, 98],
    },
  )
})

test('range', () => {
  expect(range(0, 0)).toEqual([])
  expect(range(1, 2)).toEqual([1])
  expect(range(1, 5)).toEqual([1, 2, 3, 4])
  expect(() => range(10, 1)).toThrow()
})

test('groupBy', () => {
  expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
    '6': [6.1, 6.3],
    '4': [4.2],
  })
})

test('orderBy', () => {
  const arr = [
    { name: 'foo', age: 19 },
    { name: 'bar', age: 16 },
    { name: 'buzz', age: 4 },
  ]

  expect(orderBy(arr, 'age')).toEqual([
    { name: 'buzz', age: 4 },
    { name: 'bar', age: 16 },
    { name: 'foo', age: 19 },
  ])
  expect(orderBy(arr, 'name')).toEqual([
    { name: 'bar', age: 16 },
    { name: 'buzz', age: 4 },
    { name: 'foo', age: 19 },
  ])
  expect(orderBy([], 'name')).toEqual([])
  expect(orderBy([{ name: 'bar', age: 16 }], 'name')).toEqual([
    { name: 'bar', age: 16 },
  ])
})

const authors = [
  { authorId: 1, name: 'David Flanagan', email: 'david.flanagan@gmail.com' },
  { authorId: 2, name: 'Kathy Sierra', email: 'kathy.sierra@gmail.com' },
  { authorId: 3, name: 'Erid Freeman', email: 'eric.freeman@gmail.com' },
  {
    authorId: 4,
    name: 'Daniel Higginbotham',
    email: 'higginbotham.daniel@gmail.com',
  },
]

const books = [
  { bookId: 1, title: 'Javascript The Definitive Guide', mainAuthorId: 1 },
  { bookId: 2, title: 'Java in a nutshell', mainAuthorId: 1 },
  { bookId: 3, title: 'Head first Java', mainAuthorId: 2 },
  { bookId: 4, title: 'Badass  Making Users Awesome', mainAuthorId: 2 },
  { bookId: 5, title: 'Head first design patterns', mainAuthorId: 3 },
  { bookId: 6, title: 'Head first design patterns', mainAuthorId: 10 },
]

test('inner join', () => {
  const result = [
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 1,
      title: 'Javascript The Definitive Guide',
      mainAuthorId: 1,
    },
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 2,
      title: 'Java in a nutshell',
      mainAuthorId: 1,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 3,
      title: 'Head first Java',
      mainAuthorId: 2,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 4,
      title: 'Badass  Making Users Awesome',
      mainAuthorId: 2,
    },
    {
      authorId: 3,
      name: 'Erid Freeman',
      email: 'eric.freeman@gmail.com',
      bookId: 5,
      title: 'Head first design patterns',
      mainAuthorId: 3,
    },
  ]

  expect(join(authors, books, 'authorId', 'mainAuthorId')).toEqual(result)
})

it('rightOuterJoin', () => {
  const result2 = [
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 1,
      title: 'Javascript The Definitive Guide',
      mainAuthorId: 1,
    },
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 2,
      title: 'Java in a nutshell',
      mainAuthorId: 1,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 3,
      title: 'Head first Java',
      mainAuthorId: 2,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 4,
      title: 'Badass  Making Users Awesome',
      mainAuthorId: 2,
    },
    {
      authorId: 3,
      name: 'Erid Freeman',
      email: 'eric.freeman@gmail.com',
      bookId: 5,
      title: 'Head first design patterns',
      mainAuthorId: 3,
    },
    { bookId: 6, title: 'Head first design patterns', mainAuthorId: 10 },
  ]
  expect(rightOuterJoin(authors, books, 'authorId', 'mainAuthorId')).toEqual(
    result2,
  )
})

it('leftOuterJoin', () => {
  const result2 = [
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 1,
      title: 'Javascript The Definitive Guide',
      mainAuthorId: 1,
    },
    {
      authorId: 1,
      name: 'David Flanagan',
      email: 'david.flanagan@gmail.com',
      bookId: 2,
      title: 'Java in a nutshell',
      mainAuthorId: 1,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 3,
      title: 'Head first Java',
      mainAuthorId: 2,
    },
    {
      authorId: 2,
      name: 'Kathy Sierra',
      email: 'kathy.sierra@gmail.com',
      bookId: 4,
      title: 'Badass  Making Users Awesome',
      mainAuthorId: 2,
    },
    {
      authorId: 3,
      name: 'Erid Freeman',
      email: 'eric.freeman@gmail.com',
      bookId: 5,
      title: 'Head first design patterns',
      mainAuthorId: 3,
    },
    {
      authorId: 4,
      name: 'Daniel Higginbotham',
      email: 'higginbotham.daniel@gmail.com',
    },
  ]
  expect(leftOuterJoin(authors, books, 'authorId', 'mainAuthorId')).toEqual(
    result2,
  )
})

test('inserAt', () => {
  const empty: number[] = []
  insertAt(empty, 0, 100)
  expect(empty).toEqual([100])

  const arr = [1, 2, 4, 5]
  insertAt(arr, 1, 10)

  expect(arr).toEqual([1, 10, 2, 4, 5])

  insertAt(arr, 0, 100)
  expect(arr).toEqual([100, 1, 10, 2, 4, 5])

  insertAt(arr, arr.length - 1, 100)
  expect(arr).toEqual([100, 1, 10, 2, 4, 100, 5])

  insertAt(arr, arr.length, 200)
  expect(arr).toEqual([100, 1, 10, 2, 4, 100, 5, 200])

  expect(() => insertAt(arr, -1, 200)).toThrow()
  expect(() => insertAt(arr, arr.length + 1, 200)).toThrow()
})

test('removeAt', () => {
  const arr = [1, 2, 4, 5]
  removeAt(arr, 0)

  expect(arr).toEqual([2, 4, 5])

  expect(() => removeAt(arr, -1)).toThrow()
  expect(() => removeAt(arr, arr.length)).toThrow()

  removeAt(arr, arr.length - 1)
  expect(arr).toEqual([2, 4])
})

test('replaceAt', () => {
  const arr = [1, 2, 4, 5]
  replaceAt(arr, 0, 2)

  expect(arr).toEqual([2, 2, 4, 5])

  expect(() => replaceAt(arr, -1, 6)).toThrow()
  expect(() => replaceAt(arr, arr.length, 8)).toThrow()

  replaceAt(arr, 1, 10)
  expect(arr).toEqual([2, 10, 4, 5])

  replaceAt(arr, arr.length - 1, 0)
  expect(arr).toEqual([2, 10, 4, 0])
})

test('groupBy', () => {
  expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
    '6': [6.1, 6.3],
    '4': [4.2],
  })
})
