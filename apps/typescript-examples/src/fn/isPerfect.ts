import { range } from './range'
import type { Nat } from './specs'

export const isPerfect = (n: Nat) =>
  range(1, n)
    .filter(i => n % i === 0)
    .reduce((a, b) => a + b, 0) === n
