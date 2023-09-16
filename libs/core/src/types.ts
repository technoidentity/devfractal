export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never

// More readable typed version of `UnionToIntersection`
export type MergeUnion<T> = (
  T extends unknown ? (k: T) => void : never
) extends (k: infer I) => void
  ? { [K in keyof I]: I[K] }
  : never

export type Prettify<T> = T extends unknown ? { [K in keyof T]: T[K] } : T

export type PickDefined<T> = Pick<
  T,
  { [K in keyof T]: undefined extends T[K] ? never : K }[keyof T]
>

export type RequiredKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? never : P
}[keyof T]

export type OptionalKeys<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never
}[keyof T]

export type IsSimilar<T, U> = T extends U ? (U extends T ? true : false) : false

// https://github.com/Microsoft/TypeScript/issues/27024
export type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false

export type OptionalIfEmpty<Options, R> = RequiredKeys<Options> extends never
  ? (options?: Options) => R
  : (options: Options) => R

export type RemoveIfEmpty<Arg extends Obj, R> = keyof Arg extends never
  ? () => R
  : (args: Arg) => R

export type Stringify<T extends object> = {
  [K in keyof T]: T[K] extends object ? Stringify<T[K]> : string
}

export type Booleanify<T extends object> = {
  [K in keyof T]: T[K] extends object ? Booleanify<T[K]> : boolean
}

export type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer TT
) => any
  ? TT
  : []

export type Obj = Record<string, any>

export type PickRequired<Props extends Obj> = {
  [K in keyof Props as undefined extends Props[K] ? never : K]: Props[K]
}

export type KeyOf<T> = Extract<keyof T, string>

export type UnionToRecord<U extends { type: string }> = {
  [E in U as E['type']]: E
}

type UndefinedKeys<T> = {
  [key in keyof T]: undefined extends T[key] ? key : never
}[keyof T]

export type MakeUndefinedOptional<T> = Prettify<
  Partial<Pick<T, UndefinedKeys<T>>> & Omit<T, UndefinedKeys<T>>
>

export type IsEmptyObject<T> = keyof T extends never ? true : false
export type IsNonEmptyObject<T> = keyof T extends never ? false : true
export type IsUndefined<T> = T extends undefined ? true : false
export type IsDefined<T> = T extends undefined ? false : true
export type IsNever<T> = [T] extends [never] ? true : false
export type IsNullish<T> = T extends null | undefined ? true : false

export type If<Cond extends boolean, Then, Else> = Cond extends true
  ? Then
  : Else

export type Iff<Cond extends boolean, Then> = Cond extends true ? Then : object

export type IfFnArg<Cond extends boolean, Arg, R> = Cond extends true
  ? (arg: Arg) => R
  : () => R

export type Nullable<T> = T | null
export type Nullish<T> = T | null | undefined
export type Optional<T> = T | undefined

export type KeyOfUnion<T> = T extends any ? keyof T : never

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
