import type { Draft } from 'immer'

export type Handlers<State> = Record<
  string,
  (state: Draft<State>, ...payload: any[]) => void
>

type Tail<T extends any[]> = ((...args: T) => any) extends (
  head: any,
  ...tail: infer TT
) => any
  ? TT
  : []
type Payload<S extends Handlers<any>, A extends keyof S> = Tail<
  Parameters<S[A]>
>

export type Action<S extends Handlers<any>, A extends keyof S> = Payload<
  S,
  A
> extends []
  ? Readonly<{ type: A }>
  : Readonly<{ type: A; payload: Payload<S, A> }>

export type ActionsFrom<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Action<Hs, A>
}[keyof Hs]

export type ActionCreators<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Payload<Hs, A> extends undefined
    ? () => Action<Hs, A>
    : (...payload: Payload<Hs, A>) => Action<Hs, A>
}

export type Actions<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Payload<Hs, A> extends undefined
    ? () => void
    : (...payload: Payload<Hs, A>) => void
}

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type ShallowObject = Record<keyof object, Primitive>

export type UpdateHandlers<T extends ShallowObject> = {
  [K in keyof T & string as `update${Capitalize<K>}`]: (
    fn: (value: T[K]) => T[K] | undefined,
  ) => void
} & {
  [K in keyof T & string as `set${Capitalize<K>}`]: (v: T[K]) => void
} & { update: (fn: (update: T) => Partial<T> | undefined) => void }
