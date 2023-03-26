import { range } from '@srtp/fn'
import { checked, Natural } from '@srtp/spec'

import { z } from 'zod'

export const power = checked([z.number(), Natural], (x, n) =>
  [...range(n)].reduce(a => a * x, 1),
)
