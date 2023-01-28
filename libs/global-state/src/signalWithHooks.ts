import { Draft } from 'immer'
import React from 'react'
import { useActionHook, useValue } from './hooks'
import { computed, signal } from './signal'
import { Read } from './types'

export function signalWithHooks<Value extends object>(initialValue: Value) {
  const atom = signal(initialValue)
  const useSignalAction = <P extends any[]>(
    fn: (draft: Draft<Value>, ...args: P) => void,
  ) => useActionHook(atom, fn)

  const useSignalValue = <Result>(fn: Read<Result>) => {
    // Really unfortunate! When 'fn' changes 'computed' should be called again!
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const valueAtom = React.useMemo(() => computed(fn), [])

    return useValue(valueAtom)
  }
  return [atom, useSignalAction, useSignalValue] as const
}
