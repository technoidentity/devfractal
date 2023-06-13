/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */

import type { Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'
import type {
  ActionCreators,
  Actions,
  ActionsFrom,
  Effect,
  Handlers,
} from './types'

type Reducer<State extends object, Hs extends Handlers<State>> = (
  state: Draft<State>,
  action: ActionsFrom<State, Hs>,
) => void

export function getActionCreators<
  State extends object,
  Hs extends Handlers<State>,
>(handlers: Hs): ActionCreators<State, Hs> {
  const actionCreators: any = {}
  for (const type of Object.keys(handlers)) {
    actionCreators[type] = (payload: any) => ({ type, payload })
  }

  return actionCreators
}

export function getActions<State extends object, Hs extends Handlers<State>>(
  actionCreators: ActionCreators<State, Hs>,
  dispatch: React.Dispatch<ActionsFrom<State, Hs>>,
): Actions<State, Hs> {
  const result = {} as any
  for (const type of Object.keys(actionCreators)) {
    result[type] = (...args: any[]) => {
      dispatch((actionCreators[type] as any)(args))
    }
  }
  return result
}

// @TODO: support many arguments as payload
export function getReducer<State extends object, Hs extends Handlers<State>>(
  handlers: Hs,
): Reducer<State, Hs> {
  return (state, action) => {
    return 'payload' in action
      ? handlers[action.type](state, ...action.payload)
      : handlers[action.type](state)
  }
}

export function state$<State extends object, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
): readonly [Reducer<State, Hs>, ActionCreators<State, Hs>, State] {
  return [
    getReducer<State, Hs>(handlers),
    getActionCreators<State, Hs>(handlers),
    initialState,
  ] as const
}

export function useState$<State extends object, Hs extends Handlers<State>>(
  args: Readonly<
    [
      reducer: Reducer<State, Hs>,
      actionCreators: ActionCreators<State, Hs>,
      initialState: State,
    ]
  >,
): readonly [State, Actions<State, Hs>] {
  const [reducer, actionCreators, initialState] = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<State, Hs> = React.useMemo(
    () => getActions(actionCreators, dispatch),
    [actionCreators, dispatch], // None should change
  )

  return [state, actions] as const
}

// @TODO: support initial state function
export function useState<State extends object, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
): readonly [State, Actions<State, Hs>] {
  // deliberate empty dependency array to avoid re-creating the state$ function
  const stateActions = React.useMemo(
    () => state$<State, Hs>(initialState, handlers),
    [],
  )

  return useState$(stateActions)
}

export type EventHandlers<State, Props, Hs extends Handlers<State>> = Record<
  string,
  (
    state: State,
    actions: Actions<State, Hs>,
    props: Props,
    ...payload: any[]
  ) => void
>

export function useEventHandlers<
  Props extends object,
  State,
  Hs extends Handlers<State>,
  EHs extends EventHandlers<State, Props, Hs>,
>(
  [state, actions]: [state: State, actions: Actions<State, Hs>],
  props: Props,
  handlers: EHs,
) {
  const stateRef = React.useRef(state)
  const propsRef = React.useRef(props)

  React.useEffect(() => {
    stateRef.current = state
    propsRef.current = props
  })

  return React.useMemo(() => {
    const result = {} as any
    for (const type of Object.keys(handlers)) {
      result[type] = (...args: any[]) => {
        handlers[type](stateRef.current, actions, propsRef.current, ...args)
      }
    }
    return result
  }, [])
}

// @TODO: Support array too?
export function state<
  State extends object,
  Hs extends Handlers<State>,
  Result extends any[],
>(
  initialState: State,
  handlers: Hs,
  effect?: Effect<State, Result>,
): (initialState?: Partial<State>) => readonly [State, Actions<State, Hs>] {
  const useLocalStateEffect = effect
    ? (state: State) => {
        const selector = React.useMemo(() => effect.selector(state), [state])
        React.useEffect(() => {
          effect.effect(selector)
        }, [selector])
      }
    : () => {}
  return moreState => {
    const state = moreState ? { ...initialState, ...moreState } : initialState
    useLocalStateEffect(state)

    return useState(state, handlers)
  }
}
