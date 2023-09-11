import type { Draft } from 'immer'
import { produce } from 'immer'
import type { PrimitiveAtom, WritableAtom } from 'jotai'
import { useAtomValue, useSetAtom } from 'jotai'
import React from 'react'

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

/**
 *
 * @param atom atom to be used for the hook
 * @param fn function that mutates the atom's value
 * @returns a hook that calls the function with the atom's value
 */
export function actionHook<Value, Args extends unknown[]>(
  atom: PrimitiveAtom<Value>,
  fn: (draft: Draft<Value>, ...args: Args) => void,
) {
  return function useAction(...args: Args) {
    const set = useImmerAction(atom)
    return set(draft => fn(draft, ...args))
  }
}
