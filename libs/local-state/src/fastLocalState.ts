import type { Draft } from 'immer'
import React from 'react'
import { useImmerReducer } from 'use-immer'

type PHandler<State, Props> = (state: Draft<State>, props: Props) => void

export type PHandlers<State, Props> = Record<
  string,
  (...payload: any[]) => PHandler<State, Props>
>

type Payload<Hs extends PHandlers<any, any>, A extends keyof Hs> = Parameters<
  Hs[A]
>[number]

type Action<S extends PHandlers<any, any>, A extends keyof S> = Payload<
  S,
  A
> extends []
  ? Readonly<{ type: A }>
  : Readonly<{ type: A; payload: Payload<S, A> }>

type ReducerAction<State, Props, Hs extends PHandlers<State, Props>> = {
  [A in keyof Hs]: Action<Hs, A>
}[keyof Hs]

type ActionCreators<State, Props, Hs extends PHandlers<State, Props>> = {
  [A in keyof Hs]: Payload<Hs, A> extends []
    ? () => Action<Hs, A>
    : (payload: Payload<Hs, A>) => Action<Hs, A>
}

type Actions<State, Props, Hs extends PHandlers<State, Props>> = {
  [A in keyof Hs]: Payload<Hs, A> extends []
    ? () => void
    : (payload: Payload<Hs, A>) => void
}

type Reducer<State, Props, Hs extends PHandlers<State, Props>> = (
  state: Draft<State>,
  action: ReducerAction<State, Props, Hs>,
) => void

function getActionCreators<State, Props, Hs extends PHandlers<State, Props>>(
  handlers: Hs,
): ActionCreators<State, Props, Hs> {
  const actionCreators: any = {}
  for (const type of Object.keys(handlers)) {
    actionCreators[type] = (payload: any) => ({ type, payload })
  }

  return actionCreators
}

function getActions<State, Props, Hs extends PHandlers<State, Props>>(
  actionCreators: ActionCreators<State, Props, Hs>,
  dispatch: React.Dispatch<ReducerAction<State, Props, Hs>>,
) {
  const result = {} as any
  for (const type of Object.keys(actionCreators)) {
    result[type] = (...args: any[]) => {
      dispatch((actionCreators[type] as any)(args))
    }
  }
  return result
}

function getReducer<State, Props, Hs extends PHandlers<State, Props>>(
  handlers: Hs,
  props: React.MutableRefObject<Props>,
): Reducer<State, Props, Hs> {
  return (state, action) => {
    const payload = 'payload' in action ? action.payload : undefined
    return handlers[action.type](...(payload as any))(state, props.current)
  }
}

function state$<State, Props, Hs extends PHandlers<State, Props>>(
  initialState: State,
  handlers: Hs,
  propsRef: React.MutableRefObject<Props>,
): readonly [
  Reducer<State, Props, Hs>,
  ActionCreators<State, Props, Hs>,
  State,
] {
  return [
    getReducer<State, Props, Hs>(handlers, propsRef),
    getActionCreators<State, Props, Hs>(handlers),
    initialState,
  ] as const
}

function useState$<State, Props, Hs extends PHandlers<State, Props>>(
  args: Readonly<
    [
      reducer: Reducer<State, Props, Hs>,
      actionCreators: ActionCreators<State, Props, Hs>,
      initialState: State,
    ]
  >,
): readonly [State, Actions<State, Props, Hs>] {
  const [reducer, actionCreators, initialState] = args
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  const actions: Actions<State, Props, Hs> = React.useMemo(
    () => getActions(actionCreators, dispatch),
    [actionCreators, dispatch], // None should change
  )

  return [state, actions] as const
}

// @TODO: support initial state function
export function usePState<
  State,
  Hs extends PHandlers<State, Props>,
  Props = object,
>(
  initialState: State,
  handlers: Hs,
  props: Props,
): readonly [State, Actions<State, Props, Hs>] {
  const propsRef = React.useRef(props)

  // update props ref
  React.useEffect(() => {
    propsRef.current = props
  }, [props])

  // deliberate empty dependency array to avoid re-creating the state$ function
  const stateActions = React.useMemo(
    () => state$<State, Props, Hs>(initialState, handlers, propsRef),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return useState$(stateActions)
}

export function pstate<State, Props, Hs extends PHandlers<State, any>>(
  initialState: State,
  handlers: Hs,
) {
  return (props?: Props, moreState?: Partial<State>) => {
    const state = { ...initialState, ...moreState }
    return usePState(state, handlers, props)
  }
}
