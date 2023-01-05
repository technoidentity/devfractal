/* eslint-disable @typescript-eslint/no-unused-expressions */
import invariant from 'tiny-invariant'

export function uniq<T>(arr: T[]): T[] {
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

export function zip<T1, T2>(fst: T1[], snd: T2[]): [T1, T2][] {
  const result: [T1, T2][] = []

  const minLen = Math.min(fst.length, snd.length)
  for (let i = 0; i < minLen; i += 1) {
    result.push([fst[i], snd[i]])
  }

  return result
}

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

export function minBy<T>(arr: T[], fn: (val: T) => number): T {
  return arr[minIndex(arr.map(val => fn(val)))]
}

export function maxBy<T>(arr: T[], fn: (val: T) => number): T {
  return arr[maxIndex(arr.map(val => fn(val)))]
}

export const zipWith = (
  fst: number[],
  snd: number[],
  fn: (v1: number, v2: number) => number,
): number[] => {
  return zip(fst, snd).map(([v1, v2]) => fn(v1, v2))
}

export function sortedUnique<T>(arr: T[]): T[] {
  return [...new Set(arr.sort((a, b) => (a > b ? 1 : -1)))]
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

export function groupBy<T, T2 extends string | number | symbol>(
  arr: T[],
  func: (args: T) => T2,
): Record<T2, T[]> {
  const result = {} as Record<T2, T[]>

  for (const obj of arr) {
    const x = func(obj)
    result[x] === undefined ? (result[x] = [obj]) : result[x].push(obj)
  }

  return result
}

export function range(start: number, stop: number): number[] {
  if (start > stop) {
    throw new Error(
      `start(${start}) should be less than or equal to stop(${stop})`,
    )
  }

  const result = []
  for (let i = start; i < stop; i += 1) {
    result.push(i)
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
