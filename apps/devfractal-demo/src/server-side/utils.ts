type Order = 'asc' | 'desc'

export function cmp<T, K extends keyof T>(key: K, order: Order) {
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
