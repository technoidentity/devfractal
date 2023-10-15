import { all, chain, isDefined, map, pick$, pipe } from 'devfractal'

type Order = 'asc' | 'desc'

function cmp<T, K extends keyof T>(key: K, order: Order) {
  return (a: T, b: T): number => {
    const x = a[key]
    const y = b[key]

    if (x < y) {
      return order === 'asc' ? -1 : 1
    }
    if (x > y) {
      return order === 'asc' ? 1 : -1
    }
    return 0
  }
}

export function iorderBy<T, K extends keyof T>(
  arr: Iterable<T>,
  key: K,
  order: Order = 'asc',
): T[] {
  return [...arr].sort(cmp<T, K>(key, order))
}

export function orderBy<T extends object, K extends keyof T>(
  key: K,
  order: Order = 'asc',
) {
  return (arr: Iterable<T>) => {
    return [...arr].sort(cmp<T, K>(key, order))
  }
}

// @TODO: Possible to convert to type guard?
export function areDefined(arr: unknown[]): boolean {
  return pipe(
    arr,
    all(el => isDefined(el)),
  )
}

export function picked<T extends object, K extends keyof T>(keys: K[]) {
  return (arr: Iterable<T>): Iterable<Pick<T, K>> => {
    return chain(
      arr,
      map(e => pick$(e, [...keys])),
    )
  }
}

export function insertAt<T>(src: readonly T[], index: number, value: T) {
  const ans = [...src.slice(0, index), value, ...src.slice(index)]
  console.log(ans)
  return ans
}
