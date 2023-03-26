export function map<T1, T2>(f: (x: T1) => T2) {
  return (arr: readonly T1[]): T2[] => {
    const result: T2[] = []
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

export function reduce<T1, T2>(f: (x: T1, acc: T2) => T2, init: T2) {
  return (arr: readonly T1[]): T2 => {
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
