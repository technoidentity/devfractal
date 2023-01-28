import produce, { Draft } from 'immer'
import { Atom, useAtomValue, useSetAtom, WritableAtom } from 'jotai'
import React from 'react'
import { z } from 'zod'
import { is } from '@srtp/core'

export function useValue<Value>(
  signal: Atom<Value> | Atom<Promise<Value>> | Atom<Value | Promise<Value>>,
) {
  return useAtomValue(signal)
}

type SetAtom<Update, Result> =
  | (undefined extends Update
      ? (draft?: Draft<Update>) => void
      : (draft: Draft<Update>) => void)
  | (undefined extends Update
      ? (update?: Update) => Result
      : (update: Update) => Result)

export function useAction<Value, Update, Result extends void | Promise<void>>(
  atom: WritableAtom<Value, Update, Result>,
): SetAtom<Update, Result> {
  const set = useSetAtom(atom)

  return React.useCallback(
    (fn: any) => set(is(z.function(), fn) ? produce(fn) : fn),
    [set],
  )
}

export function useSlice<Value, Update, Result extends void | Promise<void>>(
  atom: WritableAtom<Value, Update, Result>,
) {
  return [useValue(atom), useAction(atom)]
}

export function useActionHook<Value, P extends any[]>(
  signal:
    | WritableAtom<Value, Value | ((draft: Draft<Value>) => void)>
    | WritableAtom<any, any, void | Promise<void>>,
  fn: (draft: Draft<Value>, ...args: P) => void,
) {
  const set = useAction(signal)

  return React.useCallback(
    (...args: P) => set((draft: Draft<Value>) => fn(draft, ...args)),
    [fn, set],
  )
}
