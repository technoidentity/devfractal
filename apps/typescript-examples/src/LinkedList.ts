import type { Link } from './link'

export class LinkedList<T> {
  head: Link<T> | undefined
  tail: Link<T> | undefined
  len: number

  constructor() {
    this.head = this.tail = undefined
    this.len = 0
  }

  get first(): T | undefined {
    return this.head?.value
  }

  get last(): T | undefined {
    return this.tail?.value
  }

  push(value: T): this {
    const link = { value, next: undefined, prev: this.tail }
    if (this.tail) {
      this.tail.next = link
    } else {
      this.head = link
    }
    this.tail = link
    this.len += 1

    return this
  }

  pop(): T | undefined {
    if (!this.tail) {
      return undefined
    }

    const value = this.tail.value
    this.tail = this.tail.prev
    if (this.tail) {
      this.tail.next = undefined
    } else {
      this.head = undefined
    }
    this.len -= 1
    return value
  }

  unshift(value: T): this {
    const link = { value, next: this.head, prev: undefined }
    if (this.head) {
      this.head.prev = link
    } else {
      this.tail = link
    }
    this.head = link
    this.len += 1

    return this
  }

  shift(): T | undefined {
    if (!this.head) {
      return undefined
    }

    const value = this.head.value
    this.head = this.head.next
    if (this.head) {
      this.head.prev = undefined
    } else {
      this.tail = undefined
    }
    this.len -= 1
    return value
  }

  insert(before: Link<T>, value: T): void {
    const link = { value, next: before, prev: before.prev }
    if (before.prev) {
      before.prev.next = link
    } else {
      this.head = link
    }
    before.prev = link
    this.len += 1
  }

  find(value: T): Link<T> | undefined {
    let link = this.head
    while (link) {
      if (link.value === value) {
        return link
      }
      link = link.next
    }
    return undefined
  }

  findBy(pred: (value: T) => boolean): Link<T> | undefined {
    let link = this.head
    while (link) {
      if (pred(link.value)) {
        return link
      }
      link = link.next
    }
    return undefined
  }

  remove(at: Link<T>): T | undefined {
    if (at.prev) {
      at.prev.next = at.next
    } else {
      this.head = at.next
    }
    if (at.next) {
      at.next.prev = at.prev
    } else {
      this.tail = at.prev
    }
    this.len -= 1
    return at.value
  }

  *[Symbol.iterator]() {
    let link = this.head
    while (link) {
      yield link.value
      link = link.next
    }
  }

  get length() {
    return this.len
  }

  static from<T>(iterable: Iterable<T>): LinkedList<T> {
    const list = new LinkedList<T>()
    for (const value of iterable) {
      list.push(value)
    }
    return list
  }
}
