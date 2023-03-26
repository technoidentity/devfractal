import { map, pipe, range, toArray } from '@srtp/fn'
import { minBy } from './minBy'

export function zip<T>(...args: T[][]) {
  const len = minBy(args, 'length').length

  return pipe(
    range(len),
    map(i => args.map(arr => arr[i])),
    toArray,
  )
}
