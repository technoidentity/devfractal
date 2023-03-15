import { minBy } from './minBy'
import { range } from './range'

export function zip<T>(...args: T[][]) {
  const len = minBy(args, 'length').length

  const nth = (i: number) => args.map(arr => arr[i])

  return range(len).map((_, i) => nth(i))
}
