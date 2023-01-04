/* eslint-disable @typescript-eslint/naming-convention */
import { castDraft, Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'
import { reducerProvider } from './provider'

export type SliceActions<State> = Record<
  string,
  (state: Draft<State>, payload: any) => void
>

type Payload<S extends SliceActions<any>, A extends keyof S> = Parameters<
  S[A]
>[1]

export type ActionResult<
  S extends SliceActions<any>,
  A extends keyof S,
> = Payload<S, A> extends undefined
  ? { type: A }
  : { type: A; payload: Payload<S, A> }

export type ActionsFrom<State, S extends SliceActions<State>> = {
  [Action in keyof S]: ActionResult<S, Action>
}[keyof S]

type ActionsCreators<State, S extends SliceActions<State>> = {
  [A in keyof S]: Payload<S, A> extends undefined
    ? () => ActionResult<S, A>
    : (payload: Payload<S, A>) => ActionResult<S, A>
}

type Actions<State, S extends SliceActions<State>> = {
  [A in keyof S]: Payload<S, A> extends undefined
    ? () => void
    : (payload: Payload<S, A>) => void
}

type Slice<State, S extends SliceActions<State>> = (
  state: Draft<State>,
  action: ActionsFrom<State, S>,
) => void

export function sliceReducer<State>() {
  return function <S extends SliceActions<any>>(slices: S) {
    return (state: Draft<State>, action: ActionsFrom<State, S>): void => {
      slices[action.type](
        state,
        'payload' in action ? action.payload : undefined,
      )
    }
  }
}

export function slice<State, S extends SliceActions<State>>(
  initialState: State,
  slices: S,
) {
  const fn: Slice<State, S> = (state, action) => {
    slices[action.type](state, 'payload' in action ? action.payload : undefined)
  }

  const actions: ActionsCreators<State, S> = {} as any
  for (const type of Object.keys(slices)) {
    ;(actions as any)[type] = (payload: any) => ({ type, payload })
  }

  return [fn, actions, initialState] as const
}

export function useSlice<State, S extends SliceActions<State>>(
  args: readonly [
    reducer: Slice<State, S>,
    actionCreators: ActionsCreators<State, S>,
    initialState: State,
  ],
) {
  const [reducer, actionCreators, initialState] = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<State, S> = React.useMemo(() => {
    const result = {} as any
    for (const type of Object.keys(actionCreators)) {
      result[type] = (...args: any[]) => {
        dispatch((actionCreators[type] as any)(...args))
      }
    }
    return result
  }, [actionCreators, dispatch])

  return [state, actions] as const
}

export function sliceHook<State, S extends SliceActions<State>>(
  initialState: State,
  slices: S,
) {
  return () => useSlice(React.useMemo(() => slice(initialState, slices), []))
}

export function providerHook<State, S extends SliceActions<State>>(
  initialState: State,
  slices: S,
) {
  const [fn, actions] = slice<State, S>(initialState, slices)

  const { useValue, ...rest } = reducerProvider(fn, castDraft(initialState))

  const useSlice = () => {
    return [useValue(), actions] as const
  }

  return {
    actions,
    useSlice,
    useValue,
    ...rest,
  }
}
