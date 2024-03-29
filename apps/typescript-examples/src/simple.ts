import { checked, Nat } from '@srtp/core'
import { all, chain, filter, map, pipe, plus, range, reduce } from '@srtp/fn'
import invariant from 'tiny-invariant'
import { z } from 'zod'

import { minBy } from './array'

export const compact = <T extends unknown[]>(arr: T): T =>
  arr.filter(x => !!x) as any as T

export function fpMaxBy<T extends object>(arr: readonly T[], by: keyof T): T {
  invariant(arr.length > 0, 'maxBy undefined on an empty array')

  const [fst, ...rest] = arr

  return pipe(
    rest,
    reduce((e, acc) => (e[by] > acc[by] ? e : acc), fst),
  )
}

export const isPrime = checked(
  [Nat],
  n =>
    n >= 2 &&
    pipe(
      range(2, n),
      all(i => n % i !== 0),
    ),
)

export const isSorted = <T>(arr: T[]) =>
  arr.every((e, i) => i < 1 || arr[i - 1] <= e)

type Comparable = string | number | Date

export function max2<T extends Comparable>(x: T, y: T): T {
  return x > y ? x : y
}

export function max<T extends Comparable>(first: T, ...rest: T[]): T {
  if (rest.length === 0) {
    return first
  }

  const [fst, ...rst] = rest
  return max2(first, max(fst, ...rst))
}

export function zip<T>(...args: T[][]) {
  const len = minBy(args, 'length').length

  return chain(
    range(len),
    map(i => args.map(arr => arr[i])),
  )
}

export const power = checked([z.number(), Nat], (x, n) =>
  [...range(n)].reduce(a => a * x, 1),
)

export const sumOfPrimes = checked([Nat], n =>
  pipe(range(n), filter(isPrime), reduce(plus, 0)),
)

export const sum = checked([Nat], n => pipe(range(n), reduce(plus, 0)))

export const isPerfect = checked(
  [Nat],
  n =>
    n ===
    pipe(
      range(1, n),
      filter(i => n % i === 0),
      reduce(plus, 0),
    ),
)

export function arrayEqual<T>(fst: readonly T[], snd: readonly T[]): boolean {
  if (fst.length !== snd.length) {
    return false
  }

  return pipe(
    range(fst.length),
    all(i => fst[i] === snd[i]),
  )
}
