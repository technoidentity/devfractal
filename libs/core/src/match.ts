import invariant from 'tiny-invariant'

import type { ExactKeys, FromUnion, TagUnion } from './types'

export function match<T extends string, U>(
  value: T,
  cases: Record<T, (value: T) => U>,
): U {
  invariant(value in cases, `No match found for ${value}`)
  return cases[value](value)
}

export type MatchHandlers<T, K extends keyof T> = {
  [V in TagUnion<T, K> & string]: (value: FromUnion<T, K, V>) => any
}

export function matchTag<
  T extends object,
  K extends keyof T,
  Hs extends MatchHandlers<T, K>,
>(
  obj: T,
  tag: K,
  handlers: ExactKeys<Hs, MatchHandlers<T, K>>,
): ReturnType<Hs[keyof Hs]> {
  const fn = (handlers as any)[obj[tag]]

  return fn(obj)
}
