import type { Draft } from 'immer'
import { produce } from 'immer'
import { useSetAtom } from 'jotai'
import { atomWithReducer as awr } from 'jotai/utils'
import React from 'react'

import type { Actions, ActionsFrom, Handlers } from '../local-state'
import { getActionCreators, getActions, getReducer } from '../local-state'

import { useValue } from './hooks'

export function atomWithReducer<State, Action>(
  initial: State,
  reducer: (state: Draft<State>, action: Action) => void,
) {
  const r: (state: State, action: Action) => State = produce(reducer)
  return awr(initial, r)
}

export function slice<State extends object, Hs extends Handlers<State>>(
  initial: State,
  handlers: Hs,
): Readonly<{
  atom: ReturnType<typeof atomWithReducer<State, ActionsFrom<State, Hs>>>
  useActions: () => Actions<State, Hs>
  useValue: () => State
}> {
  const atom = atomWithReducer(initial, getReducer<State, Hs>(handlers))

  const useSliceActions = () => {
    const dispatch = useDispatch(atom)
    const actions: Actions<State, Hs> = React.useMemo(
      () => getActions(getActionCreators(handlers), dispatch),
      [dispatch],
    )

    return actions
  }

  const useSliceValue = () => useValue(atom)

  return { atom, useActions: useSliceActions, useValue: useSliceValue }
}

export const useDispatch = useSetAtom
