import { range } from './range'
import { Int } from './specs'

export function sum(n: number): number {
  Int.parse(n)

  return range(n).reduce((a, b) => a + b, 0)
}
