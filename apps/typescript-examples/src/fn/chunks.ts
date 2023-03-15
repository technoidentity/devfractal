import { Nat } from './specs'

export function chunks<T>(arr: readonly T[], size: Nat): T[][] {
  Nat.parse(size)

  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }

  return result
}
