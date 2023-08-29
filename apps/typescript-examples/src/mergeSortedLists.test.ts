import { expect, test } from 'vitest'

import { LinkedList } from './LinkedList'
import { linkToIterable, mergeSortedLists } from './mergeSortedLists'

test('mergeSortedLists', () => {
  const lst = LinkedList.from([1, 13, 24, 35])
  const snd = LinkedList.from([1, 2, 7, 10, 13, 14, 15, 23, 27, 30, 35])

  expect([...linkToIterable(mergeSortedLists(lst.head, snd.head))]).toEqual([
    1, 1, 2, 7, 10, 13, 13, 14, 15, 23, 24, 27, 30, 35, 35,
  ])

  expect([...linkToIterable(mergeSortedLists(undefined, snd.head))]).toEqual([
    1, 2, 7, 10, 13, 14, 15, 23, 27, 30, 35,
  ])

  expect([...linkToIterable(mergeSortedLists(lst.head, undefined))]).toEqual([
    1, 13, 24, 35,
  ])

  expect([...linkToIterable(mergeSortedLists(undefined, undefined))]).toEqual(
    [],
  )

  expect([...lst]).toEqual([1, 13, 24, 35])
  expect([...snd]).toEqual([1, 2, 7, 10, 13, 14, 15, 23, 27, 30, 35])
})
