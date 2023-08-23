import { is } from '@srtp/core'
import type { Draft } from 'immer'
import { produce } from 'immer'
import type { Getter, Setter, WritableAtom } from 'jotai'
import { atom } from 'jotai'
import { z } from 'zod'
import type { ImmerSetter, ImmerWrite } from './types'

export function immerAction<Args extends unknown[], Result>(
  write: ImmerWrite<Args, Result>,
): WritableAtom<null, Args, Result> {
  return atom(null, (get, set, ...args: Args) => {
    const setter: ImmerSetter = (atom, fn) => {
      const value = produce(get(atom), is(z.function(), fn) ? fn : () => fn)

      return set(atom, ...(value as any))
    }

    return write({ set: setter, get }, ...args)
  })
}

export function atomAction<Value, Args extends unknown[], Result>(
  signal: WritableAtom<Value, any, Result>,
  fn: (
    api: { state: Draft<Value>; get: Getter; set: Setter },
    ...args: Args
  ) => void,
) {
  return atom(null, (get, set, ...args: Args) =>
    set(
      signal,
      produce(get(signal), draft => fn({ state: draft, get, set }, ...args)),
    ),
  )
}

export function action<Args extends unknown[], Result>(
  write: ImmerWrite<Args, Result>,
): WritableAtom<null, Args, Result>

export function action<Value, Args extends unknown[], Result>(
  signal: WritableAtom<Value, any, Result>,
  fn: (
    api: { state: Draft<Value>; get: Getter; set: Setter },
    ...args: Args
  ) => void,
): WritableAtom<null, Args, Result>

export function action<Args extends unknown[], Result>(
  ...args: [any] | [any, any]
): WritableAtom<null, Args, Result> {
  return args.length === 1 ? immerAction(...args) : atomAction(...args)
}
