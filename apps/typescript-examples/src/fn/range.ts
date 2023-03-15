import { Nat } from './specs'

export function range(start: number, stop?: Nat) {
  Nat.parse(start)

  const first = stop ? start : 0
  const last = stop ? stop : start

  Nat.parse(last)

  const result: number[] = []
  for (let i = first; i < last; i += 1) {
    result.push(i)
  }

  return result
}
