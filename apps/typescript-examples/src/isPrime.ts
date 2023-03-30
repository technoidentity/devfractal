import { all, pipe, range } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'

export const isPrime = checked(
  [Natural],
  n =>
    n >= 2 &&
    pipe(
      range(2, n),
      all(i => n % i !== 0),
    ),
)
