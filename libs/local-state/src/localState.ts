/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */

import { Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'
import { ActionCreators, Actions, ActionsFrom, Handlers } from './types'

type Reducer<State, Hs extends Handlers<State>> = (
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

export function getActions<State, Hs extends Handlers<State>>(
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
): Reducer<State, Hs> {
  return (state, action) => {
    return slices[action.type](
      state,
      'payload' in action ? action.payload : undefined,
    )
  }
}

export function state$<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  return [
    getReducer<State, Hs>(handlers),
    getActionCreators<State, Hs>(handlers),
    initialState,
  ] as const
}

export function useState$<State, Hs extends Handlers<State>>(
  args: Readonly<
    [
      reducer: Reducer<State, Hs>,
      actionCreators: ActionCreators<State, Hs>,
      initialState: State,
    ]
  >,
) {
  const [reducer, actionCreators, initialState] = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<State, Hs> = React.useMemo(
    () => getActions(actionCreators, dispatch),
    [actionCreators, dispatch], // None should change
  )

  return [state, actions] as const
}

// returns a react hook
export function state<State, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  return () =>
    useState$(
      React.useMemo(
        () => state$(initialState, handlers),
        [initialState, handlers],
      ),
    )
}
