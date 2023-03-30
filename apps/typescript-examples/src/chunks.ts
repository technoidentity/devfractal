import { Nat } from './specs'

export function* chunks<T>(
  arr: readonly T[],
  size: Nat,
): IterableIterator<T[]> {
  Nat.parse(size)

  for (let i = 0; i < arr.length; i += size) {
    yield arr.slice(i, i + size)
  }
}
