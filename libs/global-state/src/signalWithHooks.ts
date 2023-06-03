import type { Draft } from 'immer'
import React from 'react'
import { actionHook, useValue } from './hooks'
import { computed } from './signal'
import type { Read } from './types'
import { atom } from 'jotai'

export function atomWithHooks<Value extends object>(initialValue: Value) {
  const signal = atom(initialValue)

  const useSignalAction = <P extends any[]>(
    fn: (draft: Draft<Value>, ...args: P) => void,
  ) => actionHook(signal, fn)

  // passed fn must always be the same
  const useSignalValue = <Result>(fn: Read<Result>) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const valueAtom = React.useMemo(() => computed(fn), [])

    return useValue(valueAtom)
  }

  return [signal, useSignalAction, useSignalValue] as const
}
