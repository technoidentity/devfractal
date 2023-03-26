type DeepFlattenArgs<T> = ReadonlyArray<T | DeepFlattenArgs<T>>

export function deepFlatten<T>(arr: DeepFlattenArgs<T>): T[] {
  const isArray = (x: unknown): x is DeepFlattenArgs<any> => Array.isArray(x)

  const result: T[] = []
  for (const e of arr) {
    result.push(...(isArray(e) ? deepFlatten(e) : [e]))
  }

  return result
}
