/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */

import { Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'
import { sliceProvider } from './sliceProvider'

export type Handlers<State> = Record<
  string,
  (state: Draft<State>, payload: any) => void
>

type Payload<S extends Handlers<any>, A extends keyof S> = Parameters<S[A]>[1]

export type Action<S extends Handlers<any>, A extends keyof S> = Payload<
  S,
  A
> extends undefined
  ? Readonly<{ type: A }>
  : Readonly<{ type: A; payload: Payload<S, A> }>

export type ActionsFrom<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Action<Hs, A>
}[keyof Hs]

type ActionCreators<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Payload<Hs, A> extends undefined
    ? () => Action<Hs, A>
    : (payload: Payload<Hs, A>) => Action<Hs, A>
}

type Actions<State, Hs extends Handlers<State>> = {
  [A in keyof Hs]: Payload<Hs, A> extends undefined
    ? () => void
    : (payload: Payload<Hs, A>) => void
}

type SliceReducer<State, Hs extends Handlers<State>> = (
  state: Draft<State>,
  action: ActionsFrom<State, Hs>,
) => void

export function getActionCreators<State, Hs extends Handlers<State>>(
  slices: Hs,
) {
  const actionCreators: any = {}
  for (const type of Object.keys(slices)) {
    actionCreators[type] = (payload: any) => ({ type, payload })
  }

  return actionCreators as ActionCreators<State, Hs>
}

function getActions<State, Hs extends Handlers<State>>(
  actionCreators: ActionCreators<State, Hs>,
  dispatch: React.Dispatch<ActionsFrom<State, Hs>>,
) {
  const result = {} as any
  for (const type of Object.keys(actionCreators)) {
    result[type] = (...args: any[]) => {
      dispatch((actionCreators[type] as any)(...args))
    }
  }
  return result
}

export function getReducer<State, Hs extends Handlers<State>>(
  slices: Hs,
): SliceReducer<State, Hs> {
  return (state, action) => {
    return slices[action.type](
      state,
      'payload' in action ? action.payload : undefined,
    )
  }
}

export function slice$<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  return {
    reducer: getReducer<State, Hs>(handlers),
    actionCreators: getActionCreators<State, Hs>(handlers),
    initialState,
  } as const
}

export function useSlice$<State, Hs extends Handlers<State>>(
  args: Readonly<{
    reducer: SliceReducer<State, Hs>
    actionCreators: ActionCreators<State, Hs>
    initialState: State
  }>,
) {
  const { reducer, actionCreators, initialState } = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<State, Hs> = React.useMemo(
    () => getActions(actionCreators, dispatch),
    [actionCreators, dispatch], // None should change
  )

  return [state, actions] as const
}

// returns a react hook
export function slice<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  return () =>
    useSlice$(
      React.useMemo(
        () => slice$(initialState, handlers),
        [initialState, handlers],
      ),
    )
}

export function provider$<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  const { reducer, actionCreators } = slice$<State, Hs>(initialState, handlers)

  return {
    actions: actionCreators,
    ...sliceProvider(reducer, initialState),
  } as const
}

export function provider<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  const { reducer, actionCreators } = slice$<State, Hs>(initialState, handlers)
  const { useValue, useDispatch, ...rest } = sliceProvider(
    reducer,
    initialState,
  )

  const useActions = (): Actions<State, Hs> => {
    const dispatch = useDispatch()

    return React.useMemo(
      () => getActions(actionCreators, dispatch),
      [actionCreators, dispatch], // None should change
    )
  }

  const useSlice = () => [useValue(), useActions()] as const

  return {
    useSlice,
    useValue,
    useActions,
    useDispatch,
    actions: actionCreators,
    ...rest,
  } as const
}
