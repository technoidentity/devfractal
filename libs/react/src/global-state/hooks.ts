import type { Draft } from 'immer'
import { produce } from 'immer'
import type { PrimitiveAtom, WritableAtom } from 'jotai'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

import { useEvent } from '../useEvent'

import { computed } from './atom'
import type { Read } from './types'

export const useAction = useSetAtom
export const useValue = useAtomValue

export function useImmerAction<Value, Result>(
  atom: WritableAtom<Value, [(value: Value) => Value], Result>,
) {
  const setState = useSetAtom(atom)
  const setStateWithImmer = React.useCallback(
    (fn: (draft: Draft<Value>) => void) => setState(produce(fn)),
    [setState],
  )
  return setStateWithImmer
}

export function actionHook<Value, Args extends unknown[]>(
  signal: PrimitiveAtom<Value>,
  fn: (draft: Draft<Value>, ...args: Args) => void,
) {
  return function useAction(...args: Args) {
    const set = useImmerAction(signal)
    return set(draft => fn(draft, ...args))
  }
}

export function useCreateAtom<Value>(initialValue: Value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useMemo(() => atom(initialValue), [])
}

export function useComputed<Value>(read: Read<Value>) {
  const reader = useEvent(read)
  const comp = React.useMemo(() => computed(reader), [reader])

  return useValue(comp)
}

export function useAtomState<Value>(
  initialValue: Value,
): readonly [
  atom: PrimitiveAtom<Value>,
  useComp: <Result>(fn: (value: Value) => Result) => Result,
] {
  const atom = useCreateAtom(initialValue)

  const useComp = <Result>(fn: (value: Value) => Result) =>
    useComputed(get => fn(get(atom)))

  return [atom, useComp] as const
}
