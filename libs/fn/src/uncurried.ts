import {
  arrayEqual,
  at,
  insert,
  paged,
  push,
  remove,
  replace,
  slice,
  sorted,
  splitAt,
  unshift,
  zipWith,
} from './array'
import {
  all,
  any,
  chain,
  filter,
  findIndex,
  flatMap,
  fmax,
  fmin,
  groupBy,
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
} from './iter'
import { pipe } from './pipe'

export function uncurry<Args extends any[], Src, R>(
  f: (...args: Args) => (src: Src) => R,
) {
  return (src: Src, ...args: Args) => pipe(src, f(...args))
}

export const map$ = uncurry(map)
export const filter$ = uncurry(filter)
export const iterEqual$ = uncurry(iterEqual)
export const groupBy$ = uncurry(groupBy)
export const flatMap$ = uncurry(flatMap)
export const zip$ = uncurry(zip)
export const zipLongest$ = uncurry(zipLongest)
export const maxBy$ = uncurry(maxBy)
export const minBy$ = uncurry(minBy)
export const maxByProp$ = uncurry(maxByProp)
export const minByProp$ = uncurry(minByProp)
export const iterSlice$ = uncurry(iterSlice)
export const chain$ = uncurry(chain)
export const takeWhile$ = uncurry(takeWhile)
export const skipWhile$ = uncurry(skipWhile)

export const at$ = uncurry(at)
export const take$ = uncurry(take)
export const skip$ = uncurry(skip)
export const slice$ = uncurry(slice)
export const insert$ = uncurry(insert)
export const replace$ = uncurry(replace)
export const remove$ = uncurry(remove)
export const paged$ = uncurry(paged)
export const splitAt$ = uncurry(splitAt)
export const push$ = uncurry(push)
export const unshift$ = uncurry(unshift)
export const sorted$ = uncurry(sorted)
export const arrayEqual$ = uncurry(arrayEqual)
export const zipWith$ = uncurry(zipWith)
export const reduce$ = uncurry(reduce)
export const findIndex$ = uncurry(findIndex)
export const all$ = uncurry(all)
export const any$ = uncurry(any)
export const fmin$ = uncurry(fmin)
export const fmax$ = uncurry(fmax)
