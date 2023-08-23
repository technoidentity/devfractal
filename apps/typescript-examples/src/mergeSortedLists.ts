import { isDefined } from '@srtp/core'
import type { Link } from './link'

type OptionalLink<T> = Link<T> | undefined

export function mergeSortedLists<T>(
  fst: OptionalLink<T>,
  snd: OptionalLink<T>,
): OptionalLink<T> {
  let current: OptionalLink<T>
  let head: OptionalLink<T>

  const add = (t: Link<T>) => {
    const link = { value: t.value, next: undefined, prev: current }

    if (current) {
      current = current.next = link
    } else {
      head = current = link
    }
  }

  let temp: Link<T>
  while (fst && snd) {
    if (fst.value <= snd.value) {
      temp = fst
      fst = fst.next
    } else {
      temp = snd
      snd = snd.next
    }

    add(temp)
  }

  for (; fst; fst = fst.next) {
    add(fst)
  }

  for (; snd; snd = snd.next) {
    add(snd)
  }

  return head
}

export function* linkToIterable<T>(head: OptionalLink<T>) {
  while (isDefined(head)) {
    yield head.value
    head = head.next
  }
}
