import { filter, pipe, plus, range, reduce } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'
import { isPrime } from './isPrime'

export const sumOfPrimes = checked([Natural], n =>
  pipe(range(n), filter(isPrime), reduce(plus, 0)),
)
