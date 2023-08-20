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

export function matchTag<T, K extends keyof T, Hs extends MatchHandlers<T, K>>(
  obj: T,
  tag: K,
  handlers: ExactKeys<Hs, MatchHandlers<T, K>>,
): ReturnType<Hs[keyof Hs]> {
  const fn = (handlers as any)(obj[tag])
  return fn(obj)
}

// type Shape =
//   | { type: 'circle'; radius: number }
//   | { type: 'square'; size: string }
//   | { type: 'triangle'; size: number }

// type T = TagUnion<Shape, 'type'>
// const shape: Shape = { type: 'square', size: '2' }

// const area = (shape: Shape) =>
//   matchTag(shape, 'type', {
//     circle: ({ radius }) => Math.PI * radius ** 2,
//     square: ({ size }) => size,
//     triangle: ({ size }) => size,
//   })

// const x = area(shape)
