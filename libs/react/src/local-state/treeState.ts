import React from 'react'

import { getActions, state$ } from './localState'
import { tree$, type ProviderProps } from './provider'
import type { Actions, ActionsFrom, Handlers } from './types'

// @TODO:
export type TreeResult<State extends object, Hs extends Handlers<State>> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Provider: (props: ProviderProps<State>) => React.ReactElement
  useValue: () => State
  useActions: () => Actions<State, Hs>
  useDispatch: () => React.Dispatch<ActionsFrom<State, Hs>>
  actions: Actions<State, Hs>
  useState: () => readonly [State, Actions<State, Hs>]
}

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
    useValue,
    useActions,
    useDispatch,
    actions,
    // this usually should not be used, use useValue and useActions instead.
    useState,
    ...rest,
  } as const
}
