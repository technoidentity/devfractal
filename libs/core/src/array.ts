export function map<T1, T2>(arr: T1[], f: (x: T1) => T2): T2[] {
  const result = []
  for (const e of arr) {
    result.push(f(e))
  }
  return result
}

export function filter<T>(arr: T[], pred: (x: T) => boolean): T[] {
  const result = []
  for (const e of arr) {
    if (pred(e)) {
      result.push(e)
    }
  }
  return result
}

export function reduce<T1, T2>(
  arr: T1[],
  f: (x: T1, acc: T2) => T2,
  init: T2,
): T2 {
  let result = init

  for (const e of arr) {
    result = f(e, result)
  }

  return result
}

export const copy = <T>(arr: readonly T[]) => [...arr]

export const merge = <T1, T2>(obj: T1, obj2: T2) => {
  return { ...obj, ...obj2 }
}

export const paged = <T>(arr: T[], current: number, limit: number) => {
  const page = current - 1
  const items = arr.slice(page * limit, (page + 1) * limit)
  return items
}
