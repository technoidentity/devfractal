/* eslint-disable @typescript-eslint/unified-signatures */

import { Draft } from 'immer'
import { Atom, WritableAtom } from 'jotai'

// types copied from jotai
export type Getter = {
  <Value>(atom: Atom<Value | Promise<Value>>): Value
  <Value>(atom: Atom<Promise<Value>>): Value
  <Value>(atom: Atom<Value>): Awaited<Value>
}

export type Setter = {
  <Value, Result extends void | Promise<void>>(
    state: WritableAtom<Value, undefined, Result>,
  ): Result
  <Value, Update, Result extends void | Promise<void>>(
    state: WritableAtom<Value, Update, Result>,
    update: Update,
  ): Result
}

export type Write<Update, Result extends void | Promise<void>> = (
  get: Getter,
  set: Setter,
  update: Update,
) => Result

export type Read<Value> = (get: Getter) => Value

export type ImmerSetter = <Value, Update, Result extends void | Promise<void>>(
  state: WritableAtom<Value, Update, Result>,
  fn: Value | ((draft: Draft<Value>) => Value | void),
) => Result

export type ImmerWrite<Update, Result extends void | Promise<void>> = (
  get: Getter,
  set: ImmerSetter,
  update: Update,
) => Result

export type { Atom, WritableAtom, PrimitiveAtom } from 'jotai'
