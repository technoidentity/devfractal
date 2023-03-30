import { filter, pipe, plus, range, reduce } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'

export const isPerfect = checked(
  [Natural],
  n =>
    n ===
    pipe(
      range(1, n),
      filter(i => n % i === 0),
      reduce(plus, 0),
    ),
)

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it.only('isPerfect', () => {
    expect(isPerfect(1)).toBe(false)
    expect(isPerfect(2)).toBe(false)
    expect(isPerfect(3)).toBe(false)
    expect(isPerfect(6)).toBe(true)
    expect(isPerfect(12)).toBe(false)
    expect(isPerfect(28)).toBe(true)
    expect(isPerfect(496)).toBe(true)
    expect(isPerfect(8128)).toBe(true)
  })
}
