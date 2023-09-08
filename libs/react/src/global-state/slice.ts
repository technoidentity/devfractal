import type { Draft } from 'immer'
import { produce } from 'immer'
import { useSetAtom } from 'jotai'
import { atomWithReducer as awr } from 'jotai/utils'
import React from 'react'

import { getActionCreators, getActions, getReducer } from '../local-state'
import type { Actions, ActionsFrom, Handlers } from '../local-state'

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
): readonly [
  atom: ReturnType<typeof atomWithReducer<State, ActionsFrom<State, Hs>>>,
  useAtomActions: () => Actions<State, Hs>,
  useValue: () => State,
] {
  const atom = atomWithReducer(initial, getReducer<State, Hs>(handlers))

  const useAtomActions = () => {
    const dispatch = useDispatch(atom)
    const actions: Actions<State, Hs> = React.useMemo(
      () => getActions(getActionCreators(handlers), dispatch),
      [dispatch],
    )

    return actions
  }

  const useSliceValue = () => useValue(atom)

  return [atom, useAtomActions, useSliceValue] as const
}

export const useDispatch = useSetAtom

/**
 *
 * @param initial initial state. Must be an object
 * @param handlers object of action handlers
 * @returns a tuple of [useValue, useActions]
 */
export function sslice<State extends object, HS extends Handlers<State>>(
  initial: State,
  handlers: HS,
): readonly [useValue: () => State, useActions: () => Actions<State, HS>] {
  const [, useActions, useValue] = slice(initial, handlers)

  return [useValue, useActions] as const
}
