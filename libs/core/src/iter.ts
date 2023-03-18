import invariant from 'tiny-invariant'
import { pipe } from './pipe'
import { Natural } from './specs/commonSpecs'

export function iterator<T>(iter: Iterable<T>) {
  return iter[Symbol.iterator]()
}

export function* range(start: number, stop?: Natural) {
  Natural.parse(start)

  const first = stop ? start : 0
  const last = stop ? stop : start

  Natural.parse(last)

  for (let i = first; i < last; i += 1) {
    yield i
  }
}

export function* enumerate<T>(iter: Iterable<T>) {
  let i = 0
  for (const e of iter) {
    yield [i, e] as const
    i += 1
  }
}

export function toArray<T>(iter: Iterable<T>) {
  return [...iter]
}

export function toSet<T>(iter: Iterable<T>) {
  return new Set(iter)
}

export function iterToMap<K, V>(iter: Iterable<[K, V]>) {
  return new Map(iter)
}

export function length<T>(iter: Iterable<T>) {
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
  return function* (iter: readonly T[]) {
    for (const e of iter) {
      if (pred(e)) {
        yield e
      }
    }
  }
}

export function* repeat<T>(n: Natural, x: T) {
  Natural.parse(n)

  for (let i = 0; i < n; i += 1) {
    yield x
  }
}

export function* repeatedly<T>(n: Natural, f: () => T) {
  Natural.parse(n)

  for (let i = 0; i < n; i += 1) {
    yield f()
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

export function take<T>(n: Natural) {
  return (arr: Iterable<T>) => {
    Natural.parse(n)

    return pipe(
      enumerate(arr),
      takeWhile(([_, i]) => i < n),
    )
  }
}

export function skip<T>(n: Natural) {
  return (arr: Iterable<T>) => {
    Natural.parse(n)

    return pipe(
      enumerate(arr),
      skipWhile(([_, i]) => i < n),
    )
  }
}

export function forEach(f: (x: unknown) => void) {
  return (arr: Iterable<unknown>) => {
    for (const e of arr) {
      f(e)
    }
  }
}

export function islice<T>(start: number, stop?: number) {
  return function* (iter: Iterable<T>) {
    if (stop === undefined) {
      stop = start
      start = 0
    }
    invariant(start >= 0, 'start must be >= 0')

    let i = 0
    for (const e of iter) {
      if (i >= stop) {
        break
      }
      if (i >= start) {
        yield e
      }

      i += 1
    }
  }
}

export function iequal<T>(snd: Iterable<T>) {
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

export function ichunks<T>(size: Natural) {
  return (arr: readonly T[]): T[][] => {
    Natural.parse(size)

    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }

    return result
  }
}

type DeepFlattenArgs<T> = Iterable<T | DeepFlattenArgs<T>>

export function* iflatten<T>(arr: DeepFlattenArgs<T>): Generator<T> {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  for (const e of arr) {
    if (isArray(e)) {
      yield* iflatten(e)
    } else {
      yield e
    }
  }
}

export function* iconcat<T>(...args: Iterable<T>[]) {
  for (const arr of args) {
    yield* arr
  }
}

export function flatMap<T1, T2>(f: (x: T1) => Iterable<T2>) {
  return function* (arr: Iterable<T1>) {
    for (const e of arr) {
      yield* f(e)
    }
  }
}

export function* izip<T1, T2>(fst: Iterable<T1>, snd: Iterable<T2>) {
  const fstIter = iterator(fst)
  const sndIter = iterator(snd)

  while (true) {
    const fstNext = fstIter.next()
    const sndNext = sndIter.next()

    if (fstNext.done || sndNext.done) {
      break
    }

    yield [fstNext.value, sndNext.value]
  }
}

export function* izipLongest<T1, T2>(
  fst: Iterable<T1>,
  snd: Iterable<T2>,
  fstDefault: T1,
  sndDefault: T2,
) {
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

export function imaxBy<T extends object>(by: keyof T) {
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
      if (e[by] > max[by]) {
        max = e
      }
    }
    return max
  }
}

export function iminBy<T extends object>(by: keyof T) {
  return (arr: readonly T[]): T => {
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
      if (e[by] < min[by]) {
        min = e
      }
    }
    return min
  }
}
