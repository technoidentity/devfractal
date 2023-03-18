import invariant from 'tiny-invariant'
import { map, range, toArray } from './iter'
import { pipe } from './pipe'
import { bool } from './specs'
import { Natural } from './specs/commonSpecs'

export function first<T>(arr: readonly T[]): T {
  invariant(arr.length > 0, 'first undefined on an empty array')
  return arr[0]
}

export function last<T>(arr: readonly T[]): T {
  invariant(arr.length > 0, 'last undefined on an empty array')
  return arr[arr.length - 1]
}

export function at(index: number) {
  return <T>(arr: readonly T[]): T | undefined => arr.at(index)
}

export function at$(index: number) {
  return <T>(arr: readonly T[]): T => {
    invariant(index >= 0 && index < arr.length, 'index out of bounds')
    return arr[index]
  }
}

export function slice(start: number, end: number) {
  return <T>(arr: readonly T[]): T[] => arr.slice(start, end)
}

export const push =
  <T>(v: T) =>
  (arr: readonly T[]): T[] =>
    [...arr, v]

export const pop = <T>(arr: readonly T[]): T[] => {
  invariant(arr.length > 0, 'pop undefined on an empty array')
  return arr.slice(0, arr.length - 1)
}

export const unshift =
  <T>(v: T) =>
  (arr: readonly T[]): T[] =>
    [v, ...arr]

export const shift = <T>(arr: readonly T[]): T[] => {
  invariant(arr.length > 0, 'shift undefined on an empty array')
  return arr.slice(1)
}
export const insert =
  <T>(index: number, value: T) =>
  (arr: readonly T[]): T[] => {
    invariant(index >= 0 && index <= arr.length, 'index out of bounds')
    return [...arr.slice(0, index), value, ...arr.slice(index)]
  }
export const remove =
  (index: number) =>
  <T>(arr: readonly T[]): T[] => {
    invariant(index >= 0 && index < arr.length, 'index out of bounds')
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
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

export const copy = <T>(arr: readonly T[]): T[] => [...arr]

export const merge =
  <T1>(obj: T1) =>
  <T2>(obj2: T2): T1 & T2 => {
    return { ...obj, ...obj2 }
  }

export const paged =
  (current: number, limit: number) =>
  <T>(arr: readonly T[]): T[] => {
    invariant(current > 0 && current < arr.length, 'current out of bounds')
    invariant(limit > 0, 'limit must be greater than 0')

    return slice((current - 1) * limit, current * limit)(arr)
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

export function arrayEqual<T>(snd: readonly T[]) {
  return (fst: readonly T[]): boolean => {
    if (fst.length !== snd.length) {
      return false
    }

    return pipe(
      range(fst.length),
      all(i => fst[i] === snd[i]),
    )
  }
}

export function chunks<T>(size: Natural) {
  return (arr: readonly T[]): T[][] => {
    Natural.parse(size)

    const result: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size))
    }

    return result
  }
}

export function compact<T extends readonly unknown[]>(arr: T): T {
  return arr.filter(bool) as any as T
}

type DeepFlattenArgs<T> = ReadonlyArray<T | DeepFlattenArgs<T>>

export function flatten<T>(arr: DeepFlattenArgs<T>): T[] {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  const result: T[] = []
  for (const e of arr) {
    result.push(...(isArray(e) ? flatten(e) : [e]))
  }

  return result
}

export function groupBy<T, K extends string | number>(f: (x: T) => K) {
  return (arr: Iterable<T>): Record<K, readonly T[]> => {
    const result: Record<K, readonly T[]> = {} as any

    for (const v of arr) {
      const k = f(v)
      result[k] = [...(result[k] ?? []), v]
    }

    return result
  }
}

export function maxBy<T extends object>(by: keyof T) {
  return (arr: readonly T[]): T => {
    invariant(arr.length > 0, 'maxBy undefined on an empty array')

    let max = arr[0]
    for (let i = 1; i < arr.length; i += 1) {
      const e = arr[i]
      if (e[by] > max[by]) {
        max = e
      }
    }
    return max
  }
}

export function minBy<T extends object>(by: keyof T) {
  return (arr: readonly T[]): T => {
    invariant(arr.length > 0, 'maxBy undefined on an empty array')

    let min = arr[0]
    for (let i = 1; i < arr.length; i += 1) {
      const e = arr[i]
      if (e[by] < min[by]) {
        min = e
      }
    }
    return min
  }
}

export function zip<T>(...args: T[][]): T[][] {
  const len = pipe(args, minBy('length')).length
  return pipe(
    range(len),
    map(i => args.map(arr => arr[i])),
    toArray,
  )
}

export function partition<T>(f: (v: T) => boolean) {
  return (arr: readonly T[]): [readonly T[], readonly T[]] => {
    const result: [T[], T[]] = [[], []]
    for (const e of arr) {
      result[f(e) ? 0 : 1].push(e)
    }
    return result
  }
}

export function splitAt<T>(index: number) {
  return (arr: readonly T[]): [readonly T[], readonly T[]] => {
    return [arr.slice(0, index), arr.slice(index)]
  }
}

export function sorted<T>(f: (a: T, b: T) => number) {
  return (arr: readonly T[]): T[] => {
    return [...arr].sort(f)
  }
}

export function reversed<T>(arr: readonly T[]): T[] {
  return [...arr].reverse()
}

export function uniqueSorted<T>(arr: readonly T[]): T[] {
  const result: T[] = []
  for (const e of arr) {
    if (last(result) !== e) {
      result.push(e)
    }
  }

  return result
}

export function unique<T>(arr: readonly T[]): T[] {
  const result: T[] = []
  for (const e of arr) {
    if (!result.includes(e)) {
      result.push(e)
    }
  }

  return result
}
