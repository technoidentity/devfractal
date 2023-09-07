import type { Draft } from 'immer'
import type { Dispatch, ReducerAction } from 'react'
import React from 'react'
import { useImmerReducer } from 'use-immer'

import { context } from '../context'
import { useIsomorphicEffect } from '../useIsomorphicEffect'

export type TreeActionsBase<S, A> = (prevState: Draft<S>, action: A) => void

export type State<R extends TreeActionsBase<any, any>> =
  R extends TreeActionsBase<infer S, any> ? S : never

type Selector<R extends TreeActionsBase<any, any>, A> = (
  snapshot: State<R>,
) => A

export type ProviderProps<T> = Readonly<{
  value?: T
  children: React.ReactNode
}>

export function tree$<R extends TreeActionsBase<any, any>>(
  initialState: State<R>,
  actions: R,
) {
  const [StateContext, useValue] = context<State<R>>({
    errorMessage: 'Missing tree Provider',
  })

  const [DispatchContext, useDispatch] = context<Dispatch<ReducerAction<R>>>({
    errorMessage: 'Missing tree Provider',
  })

  const Provider = ({ children, value }: ProviderProps<State<R>>) => {
    const [state, dispatch] = useImmerReducer(actions, {
      ...initialState,
      ...value,
    })

    return (
      <StateContext value={state}>
        <DispatchContext value={dispatch}>{children}</DispatchContext>
      </StateContext>
    )
  }

  function useAction<Args extends any[]>(
    handler: (...args: Args) => ReducerAction<R>,
  ) {
    const ref = React.useRef(handler)
    const dispatch = useDispatch()

    useIsomorphicEffect(() => {
      ref.current = handler
    })

    return React.useCallback(
      (...args: Args) => {
        dispatch(ref.current(...args))
      },
      [dispatch],
    )
  }

  // @TODO: use context-selector
  function useSelect<A>(select: Selector<R, A>): A {
    const snapshot = useValue()
    const ref = React.useRef(select)
    useIsomorphicEffect(() => {
      ref.current = select
    })
    return React.useMemo(() => ref.current(snapshot), [snapshot])
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  return { Provider, useValue, useDispatch, useSelect, useAction }
}
