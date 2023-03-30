import { index } from './object'

// Uses identity equality. As a Map in javascript uses identity equality
export function join<
  P extends object,
  F extends object,
  PK extends keyof P,
  FK extends keyof F,
>(
  primary: readonly P[],
  foreign: readonly F[],
  primaryKey: PK,
  foreignKey: FK,
): Array<P & F> {
  const result: Array<P & F> = []
  const primaryIndex = index(primary, primaryKey)

  for (const f of foreign) {
    const found = primaryIndex.get(f[foreignKey] as any)

    if (found) {
      result.push({ ...f, ...found })
    }
  }

  return result
}

export function rightOuterJoin<T extends object, U extends object>(
  primary: readonly T[],
  foreign: readonly U[],
  primaryKey: keyof T,
  foreignKey: keyof U,
): Array<T | U> {
  const result: Array<T | U> = []
  const primaryIndex = index(primary, primaryKey)

  for (const f of foreign) {
    const found = primaryIndex.get(f[foreignKey] as any)
    result.push({ ...f, ...found })
  }

  return result
}

export function leftOuterJoin<T extends object, U extends object>(
  primary: readonly T[],
  foreign: readonly U[],
  primaryKey: keyof T,
  foreignKey: keyof U,
): Array<T | U> {
  const result: Array<T | U> = []
  const foreignIndex = index(foreign, foreignKey)

  for (const p of primary) {
    const found = foreignIndex.get(p[primaryKey] as any)
    result.push({ ...p, ...found })
  }

  return result
}

type OrderByKeys<T> = Readonly<{ [K in keyof T]: 'asc' | 'desc' }>

export function keyComparer<T, K extends keyof T>(keys: OrderByKeys<T>) {
  return (a: T, b: T) => {
    for (const key of Object.keys(keys) as K[]) {
      if (a[key] < b[key]) {
        return keys[key] === 'asc' ? -1 : 1
      }
      if (a[key] > b[key]) {
        return keys[key] === 'asc' ? 1 : -1
      }
    }

    return 0
  }
}

export function orderBy<T, K extends keyof T>(keys: OrderByKeys<T>) {
  return (arr: Iterable<T>): T[] => {
    return [...arr].sort(keyComparer<T, K>(keys))
  }
}
