/* eslint-disable @typescript-eslint/no-unnecessary-condition */

export function groupBy<T, K extends string | number>(
  arr: Iterable<T>,
  f: (x: T) => K,
): Record<K, readonly T[]> {
  const result = {} as Record<K, readonly T[]>

  for (const v of arr) {
    const k = f(v)
    result[k] = result[k] !== undefined ? [...result[k], v] : [v]
  }

  return result
}
