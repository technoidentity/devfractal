import type { Draft } from 'immer'
import { atom } from 'jotai'
import React from 'react'

import { computed } from './atom'
import { actionHook, useValue } from './hooks'
import type { Read } from './types'

/**
 *
 * @param initialValue initial state. Must be an object
 * @returns a tuple of [atom, useAtomAction, useAtomValue]
 * @example
 * const [signal, useAction, useValue] = atomWithHooks({ count: 0 })
 *
 * const increment = useAction((draft, n: number) => {
 *  draft.count += n
 * })
 *
 * const doubled = useValue(get => get(signal).count * 2)
 *
 */

export function atomWithHooks<Value extends object>(initialValue: Value) {
  const signal = atom(initialValue)

  const useAtomAction = <P extends any[]>(
    fn: (draft: Draft<Value>, ...args: P) => void,
  ) => actionHook(signal, fn)

  // passed fn must always be the same
  const useAtomValue = <Result>(fn: Read<Result>) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const valueAtom = React.useMemo(() => computed(fn), [])

    return useValue(valueAtom)
  }

  return { atom: signal, useAction: useAtomAction, useValue: useAtomValue }
}
