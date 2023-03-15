import { any } from './any'
import { range } from './range'
import type { Nat } from './specs'

export const isPrime = (n: Nat) => any(range(2, n), i => n % i === 0)
