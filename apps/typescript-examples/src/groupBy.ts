export function groupBy<T, K extends string | number>(
  arr: readonly T[],
  f: (x: T) => K,
): Record<K, readonly T[]> {
  const result: Record<K, readonly T[]> = {} as any

  for (const v of arr) {
    const k = f(v)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    result[k] = result[k] === undefined ? [...result[k], v] : [v]
  }

  return result
}
