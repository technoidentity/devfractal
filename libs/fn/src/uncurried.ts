import {
  aget,
  arrayEqual,
  insert,
  paged,
  push,
  remove,
  replace,
  sorted,
  splitAt,
  unshift,
} from './array'
import {
  all,
  any,
  cons,
  filter,
  findIndex,
  flatMap,
  fmax,
  fmin,
  groupBy,
  iterChain,
  iterEqual,
  iterSlice,
  map,
  maxBy,
  maxByProp,
  minBy,
  minByProp,
  reduce,
  skip,
  skipWhile,
  take,
  takeWhile,
  zip,
  zipLongest,
  zipWith,
} from './iter'
import { merge, omap, omit, omitBy, pick, pickBy, pluck } from './object'
import { pipe } from './pipe'

export function unpipe<Args extends any[], Src, R>(
  f: (...args: Args) => (src: Src) => R,
) {
  return (src: Src, ...args: Args) => pipe(src, f(...args))
}

export function p<Args extends any[], Src, R>(
  f: (src: Src, ...args: Args) => R,
) {
  return (...args: Args) =>
    (src: Src): R =>
      f(src, ...args)
}

export const map$ = unpipe(map)
export const filter$ = unpipe(filter)
export const iterEqual$ = unpipe(iterEqual)
export const groupBy$ = unpipe(groupBy)
export const flatMap$ = unpipe(flatMap)
export const maxBy$ = unpipe(maxBy)
export const minBy$ = unpipe(minBy)
export const maxByProp$ = unpipe(maxByProp)
export const minByProp$ = unpipe(minByProp)
export const iterSlice$ = unpipe(iterSlice)
export const iterChain$ = unpipe(iterChain)
export const takeWhile$ = unpipe(takeWhile)
export const skipWhile$ = unpipe(skipWhile)
export const take$ = unpipe(take)
export const skip$ = unpipe(skip)

export const unshift$ = unpipe(unshift)
export const insert$ = unpipe(insert)
export const replace$ = unpipe(replace)
export const splitAt$ = unpipe(splitAt)
export const push$ = unpipe(push)

export const zipLongest$ = unpipe(zipLongest)
export const sorted$ = unpipe(sorted)
export const arrayEqual$ = unpipe(arrayEqual)
export const zipWith$ = unpipe(zipWith)
export const reduce$ = unpipe(reduce)
export const findIndex$ = unpipe(findIndex)
export const all$ = unpipe(all)
export const any$ = unpipe(any)
export const fmin$ = unpipe(fmin)
export const fmax$ = unpipe(fmax)
export const cons$ = unpipe(cons)

export const pick$ = unpipe(pick)
export const omit$ = unpipe(omit)
export const pluck$ = unpipe(pluck)
export const merge$ = unpipe(merge)
export const omap$ = unpipe(omap)
export const pickBy$ = unpipe(pickBy)
export const omitBy$ = unpipe(omitBy)

export function zip$<T, U>(
  second: Iterable<U>,
  first: Iterable<T>,
): Generator<readonly [T, U]> {
  return zip(second)(first)
}

export function at$<T>(arr: readonly T[], index: number): T {
  return aget(index)(arr)
}

export function remove$<T>(arr: readonly T[], index: number): T[] {
  return remove(index)(arr)
}

export function paged$<T>(arr: readonly T[], page: number, limit: number): T[] {
  return paged(page, limit)(arr)
}
