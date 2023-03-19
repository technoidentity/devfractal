import invariant from 'tiny-invariant'
import { pipe } from './pipe'

export function iterator<T>(iter: Iterable<T>): Iterator<T> {
  return iter[Symbol.iterator]()
}

export function* range(start: number, stop?: number) {
  invariant(start >= 0, 'start must be >= 0')

  const first = stop ? start : 0
  const last = stop ? stop : start

  invariant(last >= first, 'last must be >= first')

  for (let i = first; i < last; i += 1) {
    yield i
  }
}

export function* repeat<T>(n: number, x: T) {
  invariant(n >= 0, 'n must be >= 0')

  for (let i = 0; i < n; i += 1) {
    yield x
  }
}

export function* repeatedly<T>(n: number, f: () => T) {
  invariant(n >= 0, 'n must be >= 0')
  for (let i = 0; i < n; i += 1) {
    yield f()
  }
}

export function* enumerate<T>(iter: Iterable<T>) {
  let i = 0
  for (const e of iter) {
    yield [e, i] as const
    i += 1
  }
}

export function toArray<T>(iter: Iterable<T>): T[] {
  return [...iter]
}

export function toSet<T>(iter: Iterable<T>): Set<T> {
  return new Set(iter)
}

export function iterToMap<K, V>(iter: Iterable<[K, V]>): Map<K, V> {
  return new Map(iter)
}

export function length<T>(iter: Iterable<T>): number {
  let len = 0
  for (const _ of iter) {
    len += 1
  }

  return len
}

export function map<T1, T2>(f: (x: T1) => T2) {
  return function* (iter: Iterable<T1>) {
    for (const e of iter) {
      yield f(e)
    }
  }
}

export function filter<T>(pred: (x: T) => boolean) {
  return function* (iter: Iterable<T>) {
    for (const e of iter) {
      if (pred(e)) {
        yield e
      }
    }
  }
}

export function reduce<T1, T2>(f: (x: T1, acc: T2) => T2, init: T2) {
  return (arr: Iterable<T1>): T2 => {
    let result = init
    for (const e of arr) {
      result = f(e, result)
    }

    return result
  }
}

export function find<T>(f: (x: T) => boolean) {
  return (arr: Iterable<T>): T | undefined => {
    for (const e of arr) {
      if (f(e)) {
        return e
      }
    }

    return undefined
  }
}

export function findIndex<T>(f: (x: T) => boolean) {
  return (arr: Iterable<T>): number => {
    let i = 0
    for (const e of arr) {
      if (f(e)) {
        return i
      }
      i += 1
    }
    return -1
  }
}

export function take<T>(n: number) {
  return (arr: Iterable<T>) => {
    invariant(n >= 0, 'n must be >= 0')

    return pipe(
      enumerate(arr),
      takeWhile(([_, i]) => i < n),
    )
  }
}

export function skip<T>(n: number) {
  return (arr: Iterable<T>) => {
    invariant(n >= 0, 'n must be >= 0')

    return pipe(
      enumerate(arr),
      skipWhile(([_, i]) => i < n),
    )
  }
}

export function takeWhile<T>(f: (x: T) => boolean) {
  return function* (arr: Iterable<T>) {
    for (const e of arr) {
      if (!f(e)) {
        break
      }

      yield e
    }
  }
}

export function skipWhile<T>(f: (x: T) => boolean) {
  return function* (arr: Iterable<T>) {
    let skip = true
    for (const e of arr) {
      if (skip && f(e)) {
        continue
      }

      skip = false
      yield e
    }
  }
}

export function all<T>(f: (v: T) => boolean) {
  return (arr: Iterable<T>): boolean => {
    for (const e of arr) {
      if (!f(e)) {
        return false
      }
    }

    return true
  }
}

export function any<T>(f: (v: T) => boolean) {
  return (arr: Iterable<T>): boolean => {
    for (const e of arr) {
      if (f(e)) {
        return true
      }
    }

    return false
  }
}

export function each(f: (x: unknown) => void) {
  return (arr: Iterable<unknown>) => {
    for (const e of arr) {
      f(e)
    }
  }
}

export function iterSlice<T>(start: number, stop?: number) {
  return function* (iter: Iterable<T>) {
    invariant(start >= 0, 'start must be >= 0')

    let i = 0
    for (const e of iter) {
      if (stop !== undefined && i >= stop) {
        break
      }
      if (i >= start) {
        yield e
      }

      i += 1
    }
  }
}

export function iterEqual<T>(snd: Iterable<T>) {
  return (fst: Iterable<T>): boolean => {
    const fstIter = iterator(fst)
    const sndIter = iterator(snd)

    while (true) {
      const fstNext = fstIter.next()
      const sndNext = sndIter.next()

      if (fstNext.done || sndNext.done) {
        return true
      }

      if (fstNext.done || sndNext.done) {
        return false
      }

      if (fstNext.value !== sndNext.value) {
        return false
      }
    }
  }
}

export function groupBy<T, K extends string | number>(f: (x: T) => K) {
  return (arr: Iterable<T>): Record<K, readonly T[]> => {
    const result: Record<K, readonly T[]> = {} as any

    for (const v of arr) {
      const k = f(v)
      result[k] = result[k] ? [...result[k], v] : [v]
    }

    return result
  }
}

type DeepFlattenArgs<T> = Iterable<T | DeepFlattenArgs<T>>

export function* iterFlatten<T>(arr: DeepFlattenArgs<T>): Generator<T> {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  for (const e of arr) {
    if (isArray(e)) {
      yield* iterFlatten(e)
    } else {
      yield e
    }
  }
}

export function chain<T>(...args: Iterable<T>[]) {
  return function* (first: Iterable<T>) {
    yield* first
    for (const arr of args) {
      yield* arr
    }
  }
}

export function flatMap<T1, T2>(f: (x: T1) => Iterable<T2>) {
  return function* (arr: Iterable<T1>) {
    for (const e of arr) {
      yield* f(e)
    }
  }
}

export function zip<T1>(second: Iterable<T1>) {
  return function* <T2>(first: Iterable<T2>) {
    const fi = iterator(first)
    const si = iterator(second)

    while (true) {
      const fnext = fi.next()
      const snext = si.next()

      if (fnext.done || snext.done) {
        break
      }

      yield [fnext.value, snext.value] as const
    }
  }
}

export function zipLongest<T1, T2>(
  snd: Iterable<T2>,
  fstDefault: T1,
  sndDefault: T2,
) {
  return function* (fst: Iterable<T1>) {
    const fstIter = iterator(fst)
    const sndIter = iterator(snd)

    while (true) {
      const fstNext = fstIter.next()
      const sndNext = sndIter.next()

      if (fstNext.done && sndNext.done) {
        break
      }

      yield [
        fstNext.done ? fstDefault : fstNext.value,
        sndNext.done ? sndDefault : sndNext.value,
      ] as const
    }
  }
}

export function fmax<T>(less: (x: T, y: T) => boolean) {
  return (arr: Iterable<T>): T => {
    const iter = iterator(arr)
    const n = iter.next()
    invariant(!n.done, 'maxBy undefined on an empty iterable')

    let max = n.value
    while (true) {
      const n = iter.next()
      if (n.done) {
        break
      }

      const e = n.value
      if (less(max, e)) {
        max = e
      }
    }

    return max
  }
}

export function fmin<T>(less: (x: T, y: T) => boolean) {
  return (arr: Iterable<T>): T => {
    const iter = iterator(arr)
    const n = iter.next()
    invariant(!n.done, 'minBy undefined on an empty iterable')

    let min = n.value
    while (true) {
      const n = iter.next()
      if (n.done) {
        break
      }

      const e = n.value
      if (less(e, min)) {
        min = e
      }
    }

    return min
  }
}

export function min<T extends number | string | Date>(arr: Iterable<T>): T {
  return pipe(
    arr,
    fmin((x: T, y: T) => x < y),
  )
}

export function max<T extends number | string | Date>(arr: Iterable<T>): T {
  return pipe(
    arr,
    fmax((x, y) => x < y),
  )
}

export function maxByProp<T, K extends keyof T>(k: K) {
  return (arr: Iterable<T>): T =>
    pipe(
      arr,
      fmax((x, y) => x[k] < y[k]),
    )
}

export function minByProp<T, K extends keyof T>(k: K) {
  return (arr: Iterable<T>): T =>
    pipe(
      arr,
      fmin((x, y) => x[k] < y[k]),
    )
}

export function maxBy<T>(f: (x: T) => number) {
  return (arr: Iterable<T>): T =>
    pipe(
      arr,
      fmax((x, y) => f(x) < f(y)),
    )
}

export function minBy<T>(f: (x: T) => number) {
  return (arr: Iterable<T>): T =>
    pipe(
      arr,
      fmin((x, y) => f(x) < f(y)),
    )
}

export const isIterable = (x: unknown): x is Iterable<any> =>
  x != null && typeof (x as any)[Symbol.iterator] === 'function'
