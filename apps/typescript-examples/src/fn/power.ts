import { z } from 'zod'
import { range } from './range'

export function power(x: number, n: number): number {
  z.number().int().positive().parse(n)

  return range(n).reduce((a, _) => a * x, 1)
}
