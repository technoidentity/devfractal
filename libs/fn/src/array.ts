import invariant from 'tiny-invariant'
import { map, range, toArray } from './iter'
import { pipe } from './pipe'
import { Natural } from '@srtp/core'

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
  return arr.filter(x => !!x) as any as T
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

export function take<T>(arr: T[], n?: number): T[] {
  return n === undefined ? arr.slice(0, 1) : arr.slice(0, n)
}

export function drop<T>(arr: T[], n?: number): T[] {
  return n === undefined ? arr.slice(1) : arr.slice(n)
}

export const minIndex = (arr: number[]): number => {
  if (arr.length === 0) {
    throw new Error('minIndex:arr is empty')
  }

  let minIdx = 0

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] < arr[minIdx]) {
      minIdx = i
    }
  }

  return minIdx
}

export const maxIndex = (arr: number[]): number => {
  if (arr.length === 0) {
    throw new Error('minIndex:arr is empty')
  }

  let maxIndex = 0

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i
    }
  }

  return maxIndex
}

export const min = (arr: number[]): number => arr[minIndex(arr)]

export const max = (arr: number[]): number => arr[maxIndex(arr)]

export function takeWhile<T>(arr: T[], pred: (val: T) => boolean): T[] {
  const result = []

  for (const e of arr) {
    if (pred(e)) {
      result.push(e)
    } else {
      break
    }
  }

  return result
}

export function dropWhile<T>(arr: T[], pred: (val: T) => boolean): T[] {
  const findIdx = arr.findIndex(v => !pred(v))
  return findIdx === -1 ? [] : arr.slice(findIdx)
}

export function fminBy<T>(arr: T[], fn: (val: T) => number): T {
  return arr[minIndex(arr.map(val => fn(val)))]
}

export function fmaxBy<T>(arr: T[], fn: (val: T) => number): T {
  return arr[maxIndex(arr.map(val => fn(val)))]
}

export const zipWith = (
  fst: number[],
  snd: number[],
  fn: (v1: number, v2: number) => number,
): number[] => {
  return zip(fst, snd).map(([v1, v2]) => fn(v1, v2))
}

export function assignWith<T extends object>(
  fst: T,
  snd: Partial<T>,
  fn: (x: any, y: any) => any,
): Record<keyof T, unknown> {
  const result: any = {}
  for (const [key, value] of Object.entries(fst)) {
    if (snd.hasOwnProperty(key)) {
      const val = fn((fst as any)[key], (snd as any)[key])
      result[key] = val
    } else {
      result[key] = value
    }
  }
  return result
}

export function keyCompare<T extends object, K extends keyof T>(orderBy: K) {
  return (a: T, b: T) => {
    if (a[orderBy] > b[orderBy]) {
      return 1
    }
    if (a[orderBy] < b[orderBy]) {
      return -1
    }
    return 0
  }
}

export function orderBy<T extends object, K extends keyof T>(
  arr: readonly T[],
  key: K,
) {
  return [...arr].sort(keyCompare(key))
}

export function join<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): readonly (T1 & T2)[] {
  const result: (T1 & T2)[] = []

  for (const f of foreign) {
    const found = primary.find(p => (p[primaryKey] as any) === f[foreignKey])
    if (found) {
      result.push({ ...f, ...found })
    }
  }

  return result
}

export function rightOuterJoin<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): any {
  const result: any = []

  for (const f of foreign) {
    const found = primary.find(p => (p[primaryKey] as any) === f[foreignKey])
    result.push({ ...f, ...found })
  }

  return result
}

export function leftOuterJoin<T1 extends object, T2 extends object>(
  primary: readonly T1[],
  foreign: readonly T2[],
  primaryKey: keyof T1,
  foreignKey: keyof T2,
): any {
  const result: any = []

  for (const p of primary) {
    const list = foreign.filter(f => (p[primaryKey] as any) === f[foreignKey])
    if (list.length === 0) {
      result.push({ ...p })
    } else {
      list.forEach(found => result.push({ ...p, ...found }))
    }
  }

  return result
}

export function insertAt<T>(arr: T[], idx: number, value: T): void {
  invariant(
    idx >= 0 && idx <= arr.length,
    `Invalid array index(0 <= idx <= ${arr.length}):${idx}"`,
  )

  arr.splice(idx, 0, value)
}

export function removeAt<T>(arr: T[], idx: number): void {
  invariant(
    idx >= 0 && idx < arr.length,
    `Invalid array index(0 <= idx <= ${arr.length}):${idx}"`,
  )

  arr.splice(idx, 1)
}

export function replaceAt<T>(arr: T[], idx: number, value: T): void {
  invariant(
    idx >= 0 && idx < arr.length,
    `Invalid array index(0 <= idx <= ${arr.length}):${idx}"`,
  )

  arr[idx] = value
}
