// eslint-disable-next-line @typescript-eslint/ban-types
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

export type Obj = Record<string, any>

export type PickRequired<Props extends Obj> = {
  [K in keyof Props as undefined extends Props[K] ? never : K]: Props[K]
}

export type RemoveEmptyFn<Arg extends Obj, R> = keyof Arg extends never
  ? () => R
  : (args: Arg) => R

export type FnArgs<Args extends Obj, R> = RemoveEmptyFn<PickRequired<Args>, R>

export type KeyOf<T> = Extract<keyof T, string>

export type GetArgOptional<T, K extends string> = Record<K, T> extends {
  [key in K]: never
}
  ? { [key in K]?: undefined }
  : { [key in K]: T }

export type UnionToRecord<U extends { type: string }> = {
  [E in U as E['type']]: E
}

type UndefinedKeys<T> = {
  [key in keyof T]: undefined extends T[key] ? key : never
}[keyof T]

export type MakeUndefinedOptional<T> = Partial<Pick<T, UndefinedKeys<T>>> &
  Omit<T, UndefinedKeys<T>>
