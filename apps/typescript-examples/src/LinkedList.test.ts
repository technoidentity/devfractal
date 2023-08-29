import invariant from 'tiny-invariant'
import { expect, test } from 'vitest'

import { LinkedList } from './LinkedList'

test('push', () => {
  const list = new LinkedList<number>()
  list.push(1).push(2).push(3).push(4).push(5)

  expect([...list]).toEqual([1, 2, 3, 4, 5])
})

test('pop', () => {
  const list = LinkedList.from([1, 2, 3, 4, 5])

  expect(list.length).toBe(5)

  let i = 0
  while (list.length > 0) {
    expect(list.pop()).toBe(5 - i)
    i += 1
  }
})

test('unshift', () => {
  const list = new LinkedList<number>()
  list.unshift(1).unshift(2).unshift(3).unshift(4).unshift(5)

  expect([...list]).toEqual([5, 4, 3, 2, 1])
})

test('shift', () => {
  const list = LinkedList.from([1, 2, 3, 4, 5])

  let i = 0
  while (list.length > 0) {
    expect(list.shift()).toBe(i + 1)
    i += 1
  }

  expect(list.length).toBe(0)
})

test('remove, find', () => {
  const empty = LinkedList.from<number>([])
  expect(empty.find(1)).toBe(undefined)
  expect(empty.findBy(v => v === 1)).toBe(undefined)

  const one = LinkedList.from([1])
  expect(one.first).toBe(1)
  expect(one.last).toBe(1)
  expect(one.find(1)).not.toBe(undefined)
  expect(one.findBy(v => v === 1)).not.toBe(undefined)
  const e = one.find(1)
  invariant(e)
  one.remove(e)
  expect(one.length).toBe(0)
  expect(one.first).toBe(undefined)
  expect(one.last).toBe(undefined)

  const list = LinkedList.from([1, 2, 3, 4, 5])

  let link = list.find(1)
  invariant(link)
  list.remove(link)

  expect([...list]).toEqual([2, 3, 4, 5])

  link = list.findBy(v => v === 5)
  invariant(link)
  list.remove(link)

  expect([...list]).toEqual([2, 3, 4])

  link = list.find(3)
  invariant(link)
  list.remove(link)

  expect([...list]).toEqual([2, 4])
})

test('insert', () => {
  const one = LinkedList.from<number>([1])
  const e = one.find(1)
  invariant(e)
  one.insert(e, 2)
  expect([...one]).toEqual([2, 1])

  const list = LinkedList.from([1, 2, 3, 4, 5])

  let link = list.find(3)
  expect(link).not.toBe(undefined)
  invariant(link)
  list.insert(link, 6)

  expect([...list]).toEqual([1, 2, 6, 3, 4, 5])

  link = list.find(1)
  expect(link).not.toBe(undefined)
  invariant(link)
  list.insert(link, 6)

  expect([...list]).toEqual([6, 1, 2, 6, 3, 4, 5])

  link = list.find(5)
  expect(link).not.toBe(undefined)
  invariant(link)
  list.insert(link, 6)

  expect([...list]).toEqual([6, 1, 2, 6, 3, 4, 6, 5])
})
