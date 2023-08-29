import type { Draft } from 'immer'
import { produce } from 'immer'
import { useSetAtom } from 'jotai'
import { atomWithReducer } from 'jotai/utils'
import React from 'react'

import { getActionCreators, getActions, getReducer } from '../local-state'
import type { Actions, Handlers } from '../local-state'

import { useValue } from './hooks'

export function signalWithReducer<State, Action>(
  initial: State,
  reducer: (state: Draft<State>, action: Action) => void,
) {
  const r: (state: State, action: Action) => State = produce(reducer)
  return atomWithReducer(initial, r)
}

export function slice<State extends object, Hs extends Handlers<State>>(
  initial: State,
  handlers: Hs,
) {
  const signal = signalWithReducer(initial, getReducer<State, Hs>(handlers))

  const useSignalActions = () => {
    const dispatch = useDispatch(signal)
    const actions: Actions<State, Hs> = React.useMemo(
      () => getActions(getActionCreators(handlers), dispatch),
      [dispatch],
    )

    return actions
  }

  const useSliceValue = () => useValue(signal)

  return [signal, useSignalActions, useSliceValue] as const
}

export const useDispatch = useSetAtom
