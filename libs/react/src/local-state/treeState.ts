import React from 'react'

import { getActions, state$ } from './localState'
import { tree$ } from './provider'
import type { Actions, Handlers } from './types'

export function tree<State extends object, Hs extends Handlers<State>>(
  initialState: State,
  handlers: Hs,
) {
  const [reducer, actions] = state$(initialState, handlers)
  const { useValue, useDispatch, ...rest } = tree$(initialState, reducer)

  const useActions = (): Actions<State, Hs> => {
    const dispatch = useDispatch()

    return React.useMemo(() => getActions(actions, dispatch), [dispatch])
  }

  const useState = () => [useValue(), useActions()] as const

  return {
    useState,
    useValue,
    useActions,
    useDispatch,
    actions,
    ...rest,
  } as const
}

export function stree<State extends object, HS extends Handlers<State>>(
  initialState: State,
  handlers: HS,
) {
  const { Provider, useValue, useActions } = tree(initialState, handlers)

  return [Provider, useValue, useActions] as const
}
