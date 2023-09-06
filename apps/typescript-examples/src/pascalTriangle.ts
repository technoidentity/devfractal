import { checked, Nat } from '@srtp/core'
import { map, mul, pipe, range, reduce } from '@srtp/fn'

export const factorial = checked([Nat], n =>
  pipe(range(1, n + 1), reduce(mul, 1)),
)

const ncr = (n: number, r: number) =>
  factorial(n) / (factorial(r) * factorial(n - r))

const pascalLine = (line: number) =>
  pipe(
    range(line + 1),
    map(i => ncr(line, i)),
  )

export const pascalTriangle = checked([Nat], n =>
  pipe(range(n + 1), map(pascalLine)),
)
