import type { Tail } from '@srtp/core'
import { capitalize, entries, map, pipe } from '@srtp/fn'
import { atom, useSetAtom } from 'jotai'
import React from 'react'

import type { Actions, ActionsFrom, Handlers } from '../local-state'
import { getActionCreators, getActions, getReducer } from '../local-state'
import { useEvent } from '../useEvent'
import { computed } from './atom'
import { useValue } from './hooks'
import { atomWithReducer } from './slice'
import type { Read } from './types'

/**
 *
 * @param initialValue initial value of the atom
 * @returns a tuple of [useValue, useAction]
 */
export function useLocalAtom<Value>(initialValue: Value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => atom(initialValue), [])
}

/**
 * @param function is called with the atom's current value and should return the new computed value
 * @return current value of the atom
 */
export function useComputed<Value>(read: Read<Value>) {
  const reader = useEvent(read)
  const comp = React.useMemo(() => computed(reader), [reader])

  return useValue(comp)
}

export type Computed<State> = Record<
  string,
  (state: Readonly<State>, ...payload: any[]) => any
>

export type ComputedValues<State, Cs extends Computed<State>> = {
  [K in keyof Cs as `use${Capitalize<K & string>}`]: (
    ...payload: Tail<Parameters<Cs[K]>>
  ) => ReturnType<Cs[K]>
}

export type LocalStateArgs<
  State extends object,
  Hs extends Handlers<State>,
  Cs extends Computed<State>,
> = Readonly<{
  initial: State
  handlers: Hs
  computed: Cs
}>

export type LocalStateResult<
  State extends object,
  Hs extends Handlers<State>,
  Cs extends Computed<State>,
> = ComputedValues<State, Cs> &
  Readonly<{
    atom: ReturnType<typeof atomWithReducer<State, ActionsFrom<State, Hs>>>
    useValue: () => State
    useActions: () => Actions<State, Hs>
  }>

export function localAtomState<
  State extends object,
  Hs extends Handlers<State>,
  Cs extends Computed<State>,
>({
  initial,
  handlers,
  computed,
}: LocalStateArgs<State, Hs, Cs>): LocalStateResult<State, Hs, Cs> {
  const atom = atomWithReducer(initial, getReducer<State, Hs>(handlers))

  const useActions = () => {
    const dispatch = useSetAtom(atom)
    const actions: Actions<State, Hs> = React.useMemo(
      () => getActions(getActionCreators(handlers), dispatch),
      [dispatch],
    )

    return actions
  }

  const computedValues: ComputedValues<State, Cs> = pipe(
    computed,
    entries,
    map(([key, fn]) => [
      `use${capitalize(key)}`,
      (...payload: any[]) => useComputed(get => fn(get(atom), ...payload)),
    ]),
    Object.fromEntries,
  )

  return {
    ...computedValues,
    atom,
    useActions,
    useValue: () => useValue(atom),
  }
}
