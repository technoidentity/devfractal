import { pipe, range, reduce } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'

export const sum = checked([Natural], n =>
  pipe(
    range(n),
    reduce((a, b) => a + b, 0),
  ),
)
