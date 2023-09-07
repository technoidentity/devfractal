import type { Tail } from '@srtp/core'
import type { Fundamental } from '@srtp/core'
import type { Draft } from 'immer'

export type Effect<State extends object, Result> = Readonly<{
  selector: (state: State) => Result
  effect: (result: Result) => void
}>

export type Effects<State extends object> = readonly Effect<State, any>[]

export type Handlers<State> = Record<
  string,
  (state: Draft<State>, ...payload: any[]) => void
>

export type HandlerPayload<S extends Handlers<any>, A extends keyof S> = Tail<
  Parameters<S[A]>
>

export type Action<S extends Handlers<any>, A extends keyof S> = HandlerPayload<
  S,
  A
> extends []
  ? Readonly<{ type: A }>
  : Readonly<{ type: A; payload: HandlerPayload<S, A> }>

export type ActionsFrom<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Action<Hs, A>
}[keyof Hs]

export type ActionCreators<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: HandlerPayload<Hs, A> extends undefined
    ? () => Action<Hs, A>
    : (...payload: HandlerPayload<Hs, A>) => Action<Hs, A>
}

export type Actions<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: HandlerPayload<Hs, A> extends undefined
    ? () => void
    : (...payload: HandlerPayload<Hs, A>) => void
}

export type ShallowObject = Record<keyof object, Fundamental>

export type UpdateHandlers<T extends ShallowObject> = {
  [K in keyof T & string as `update${Capitalize<K>}`]: (
    fn: (value: T[K]) => T[K] | undefined,
  ) => void
} & {
  [K in keyof T & string as `set${Capitalize<K>}`]: (v: T[K]) => void
} & { update: (fn: (update: T) => Partial<T> | undefined) => void }
