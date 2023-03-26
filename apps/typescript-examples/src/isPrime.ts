import { any, pipe, range } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'

export const isPrime = checked([Natural], n =>
  n === 1
    ? false
    : !pipe(
        range(2, n),
        any(i => n % i === 0),
      ),
)
