import { isFunction } from '@srtp/core'
import type { Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'

export type PropsStateHandlers<Props, State> = Record<
  string,
  (...payload: any[]) => (state: Draft<State>, props: Props) => void
>

type Payload<
  Hs extends PropsStateHandlers<any, any>,
  A extends keyof Hs,
> = Parameters<Hs[A]>[number]

type Action<
  S extends PropsStateHandlers<any, any>,
  A extends keyof S,
> = Payload<S, A> extends []
  ? Readonly<{ type: A }>
  : Readonly<{ type: A; payload: Payload<S, A> }>

type ReducerAction<
  Props,
  State,
  Hs extends PropsStateHandlers<Props, State>,
> = {
  [A in keyof Hs]: Action<Hs, A>
}[keyof Hs]

type ActionCreators<
  Props,
  State,
  Hs extends PropsStateHandlers<Props, State>,
> = {
  [A in keyof Hs]: Payload<Hs, A> extends []
    ? () => Action<Hs, A>
    : (payload: Payload<Hs, A>) => Action<Hs, A>
}

type Actions<Props, State, Hs extends PropsStateHandlers<Props, State>> = {
  [A in keyof Hs]: Payload<Hs, A> extends []
    ? () => void
    : (payload: Payload<Hs, A>) => void
}

type Reducer<Props, State, Hs extends PropsStateHandlers<Props, State>> = (
  state: Draft<State>,
  action: ReducerAction<Props, State, Hs>,
) => void

function getActionCreators<
  Props,
  State,
  Hs extends PropsStateHandlers<Props, State>,
>(handlers: Hs): ActionCreators<Props, State, Hs> {
  const actionCreators: any = {}
  for (const type of Object.keys(handlers)) {
    actionCreators[type] = (payload: any) => ({ type, payload })
  }

  return actionCreators
}

function getActions<Props, State, Hs extends PropsStateHandlers<Props, State>>(
  actionCreators: ActionCreators<Props, State, Hs>,
  dispatch: React.Dispatch<ReducerAction<Props, State, Hs>>,
) {
  const result = {} as any
  for (const type of Object.keys(actionCreators)) {
    result[type] = (...args: any[]) => {
      dispatch((actionCreators[type] as any)(args))
    }
  }
  return result
}

function getReducer<Props, State, Hs extends PropsStateHandlers<Props, State>>(
  handlers: Hs,
  props: React.MutableRefObject<Props>,
): Reducer<Props, State, Hs> {
  return (state, action) => {
    const payload = 'payload' in action ? action.payload : undefined
    return handlers[action.type](...(payload as any))(state, props.current)
  }
}

function state$<Props, State, Hs extends PropsStateHandlers<Props, State>>(
  initialState: State,
  handlers: Hs,
  propsRef: React.MutableRefObject<Props>,
): readonly [
  Reducer<Props, State, Hs>,
  ActionCreators<Props, State, Hs>,
  State,
] {
  return [
    getReducer<Props, State, Hs>(handlers, propsRef),
    getActionCreators<Props, State, Hs>(handlers),
    initialState,
  ] as const
}

function useState$<Props, State, Hs extends PropsStateHandlers<Props, State>>(
  args: Readonly<
    [
      reducer: Reducer<Props, State, Hs>,
      actionCreators: ActionCreators<Props, State, Hs>,
      initialState: State,
    ]
  >,
): readonly [State, Actions<Props, State, Hs>] {
  const [reducer, actionCreators, initialState] = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<Props, State, Hs> = React.useMemo(
    () => getActions(actionCreators, dispatch),
    [actionCreators, dispatch], // None should change
  )

  return [state, actions] as const
}

// @TODO: support initial state function
export function usePropsState<
  Props,
  State,
  Hs extends PropsStateHandlers<Props, State>,
>(
  handlers: Hs,
  props: Props,
  initialState: State | (() => State),
): readonly [State, Actions<Props, State, Hs>] {
  const propsRef = React.useRef(props)

  // update props ref
  React.useEffect(() => {
    propsRef.current = props
  }, [props])

  const state = React.useMemo(
    () => (isFunction(initialState) ? initialState() : initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // deliberate empty dependency array to avoid re-creating the state$ function
  const stateActions = React.useMemo(
    () => state$<Props, State, Hs>(state, handlers, propsRef),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return useState$(stateActions)
}

export function propsState<Props>() {
  return <State, Hs extends PropsStateHandlers<Props, State>>(
    initialState: State,
    handlers: Hs,
  ) => {
    return (
      props: Props,
      moreState?: Partial<State> | (() => Partial<State>),
    ): readonly [State, Actions<Props, State, Hs>] => {
      const mstate = isFunction(moreState) ? moreState() : moreState

      const state = React.useMemo(
        () => ({ ...initialState, ...mstate }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
      )

      return usePropsState(handlers, props, state)
    }
  }
}
