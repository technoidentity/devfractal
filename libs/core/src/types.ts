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
