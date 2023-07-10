export type Prettify<T> = T & {}

export type Stringify<T extends object> = {
  [K in keyof T]: T[K] extends object ? Stringify<T[K]> : string
}

export type Booleanify<T extends object> = {
  [K in keyof T]: T[K] extends object ? Booleanify<T[K]> : boolean
}

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

export type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer TT
) => any
  ? TT
  : []

export type TagUnion<T, K extends keyof T> = T extends Record<K, T[K]>
  ? T[K]
  : never

export type FromUnion<
  T,
  K extends keyof T,
  V extends TagUnion<T, K>,
> = T extends Record<K, V> ? T : never

export type ExactKeys<T, U> = [keyof T] extends [keyof U]
  ? T
  : { [Key in keyof U]: Key extends keyof T ? T[Key] : never }
