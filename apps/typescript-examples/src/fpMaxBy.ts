import { pipe } from '@srtp/fn'
import invariant from 'tiny-invariant'
import { reduce } from './array'

export function fpMaxBy<T extends object>(arr: readonly T[], by: keyof T): T {
  invariant(arr.length > 0, 'maxBy undefined on an empty array')

  const [fst, ...rest] = arr

  return pipe(
    rest,
    reduce((e, acc) => (e[by] > acc[by] ? e : acc), fst),
  )
}
