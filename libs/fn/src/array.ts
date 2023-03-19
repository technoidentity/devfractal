import invariant from 'tiny-invariant'
import { all, map, minByProp, range, toArray, zip } from './iter'
import { pipe } from './pipe'

export function first<T>(arr: readonly T[]): T {
  invariant(arr.length > 0, 'first undefined on an empty array')
  return arr[0]
}

export function first$<T>(arr: readonly T[]): T | undefined {
  return arr.at(0)
}

export function last<T>(arr: readonly T[]): T {
  invariant(arr.length > 0, 'last undefined on an empty array')
  return arr[arr.length - 1]
}

export function last$<T>(arr: readonly T[]): T | undefined {
  return arr.at(-1)
}

export function at(index: number) {
  return <T>(arr: readonly T[]): T => {
    const r = arr.at(index)
    invariant(r !== undefined, 'index out of bounds')
    return r
  }
}

export function slice(start?: number, end?: number) {
  return <T>(arr: readonly T[]): T[] => arr.slice(start, end)
}

export const push =
  <T>(...v: T[]) =>
  (arr: readonly T[]): T[] =>
    [...arr, ...v]

export function pop<T>(arr: readonly T[]): T[] {
  return arr.slice(0, arr.length - 1)
}

export function unshift<T>(...v: T[]) {
  return (arr: readonly T[]): T[] => [...v, ...arr]
}

export function shift<T>(arr: readonly T[]): T[] {
  return arr.slice(1)
}

export function insert<T>(index: number, ...value: T[]) {
  return (arr: readonly T[]): T[] => {
    invariant(index >= 0 && index <= arr.length, 'index out of bounds')
    return [...arr.slice(0, index), ...value, ...arr.slice(index)]
  }
}

export function replace<T>(index: number, value: T) {
  return (arr: readonly T[]): T[] => {
    invariant(index >= 0 && index < arr.length, 'index out of bounds')
    return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
  }
}

export function remove(index: number) {
  return <T>(arr: readonly T[]): T[] => {
    invariant(index >= 0 && index < arr.length, 'index out of bounds')
    return [...arr.slice(0, index), ...arr.slice(index + 1)]
  }
}

export const copy = <T>(arr: readonly T[]): T[] => [...arr]

export function paged(page: number, limit: number) {
  return <T>(arr: readonly T[]): T[] => {
    invariant(limit > 0, 'limit must be greater than 0')
    invariant(page > 0, 'page must be greater than 0')
    invariant((page - 1) * limit < arr.length, 'page out of bounds')

    return slice((page - 1) * limit, page * limit)(arr)
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

type DeepFlattenArgs<T> = ReadonlyArray<T | DeepFlattenArgs<T>>

export function flatten<T>(arr: DeepFlattenArgs<T>): T[] {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  const result: T[] = []
  for (const e of arr) {
    result.push(...(isArray(e) ? flatten(e) : [e]))
  }

  return result
}

export function zipAll<T>(...args: T[][]): T[][] {
  if (args.length === 0) {
    return []
  }
  const len = pipe(args, minByProp('length')).length

  return pipe(
    range(len),
    map(i => args.map(arr => arr[i])),
    toArray,
  )
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
    if (last$(result) !== e) {
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

export function minIndex<T extends string | number | Date>(arr: T[]): number {
  invariant(arr.length > 0, 'minIndex not defined on empty array')

  let mi = 0
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < arr[mi]) {
      mi = i
    }
  }

  return mi
}

export const maxIndex = (arr: number[]): number => {
  invariant(arr.length > 0, 'maxIndex not defined on empty array')

  let mi = 0
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > arr[mi]) {
      mi = i
    }
  }

  return mi
}

export function zipWith<T1, T2, T3>(
  snd: readonly T2[],
  fn: (v1: T1, v2: T2) => T3,
) {
  return (fst: readonly T1[]): T3[] => {
    const result = pipe(
      fst,
      zip(snd),
      map(([v1, v2]) => fn(v1, v2)),
      toArray,
    )

    return result
  }
}
