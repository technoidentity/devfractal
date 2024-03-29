import invariant from 'tiny-invariant'

export function map<T, U>(f: (x: T) => U) {
  return (arr: readonly T[]): U[] => {
    const result: U[] = []
    for (const e of arr) {
      result.push(f(e))
    }

    return result
  }
}

export function filter<T>(pred: (v: T) => boolean) {
  return (arr: readonly T[]): T[] => {
    const result: T[] = []
    for (const e of arr) {
      if (pred(e)) {
        result.push(e)
      }
    }

    return result
  }
}

export function reduce<T, U>(f: (x: T, acc: U) => U, init: U) {
  return (arr: readonly T[]): U => {
    let result = init
    for (const e of arr) {
      result = f(e, result)
    }

    return result
  }
}

export function findIndex<T>(arr: readonly T[], val: T, pos = 0): number {
  for (let i = pos; i < arr.length; i += 1) {
    if (arr[i] === val) {
      return i
    }
  }

  return -1
}

export function find<T>(
  arr: readonly T[],
  pred: (val: T) => boolean,
  pos = 0,
): number {
  for (let i = pos; i < arr.length; i += 1) {
    if (pred(arr[i])) {
      return i
    }
  }

  return -1
}

export function some<T>(arr: readonly T[], f: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (f(e)) {
      return true
    }
  }

  return false
}

export function every<T>(arr: readonly T[], f: (v: T) => boolean): boolean {
  for (const e of arr) {
    if (!f(e)) {
      return false
    }
  }

  return true
}

export function skipWhile<T>(arr: readonly T[], f: (v: T) => boolean): T[] {
  for (let i = 0; i < arr.length; i += 1) {
    if (!f(arr[i])) {
      return arr.slice(i)
    }
  }

  return []
}

export function takeWhile<T>(arr: readonly T[], f: (v: T) => boolean): T[] {
  for (let i = 0; i < arr.length; i += 1) {
    if (!f(arr[i])) {
      return arr.slice(0, i)
    }
  }

  return arr.slice()
}

type DeepFlattenArgs<T> = ReadonlyArray<T | DeepFlattenArgs<T>>

export function deepFlatten<T>(arr: DeepFlattenArgs<T>): T[] {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  const result: T[] = []
  for (const e of arr) {
    result.push(...(isArray(e) ? deepFlatten(e) : [e]))
  }

  return result
}

export function minBy<T extends object>(arr: readonly T[], by: keyof T): T {
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
