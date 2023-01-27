import produce, { Draft } from 'immer'
import { Atom, atom, PrimitiveAtom, WritableAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { ImmerSetter, ImmerWrite, Read, Write } from './types'
import { z } from 'zod'
import { is } from '@srtp/core'

export function signal<Value extends Object>(initialValue: Value) {
  return atom(initialValue)
}

export function asyncSignal<Value>(read: Read<Value>) {
  return atom(read)
}

export function signals<Value>() {
  return signal<PrimitiveAtom<Value>[]>([])
}

export function computed<Value>(read: Read<Value>) {
  return atom(read)
}

// export function plainAction<
//   Value,
//   Update,
//   Result extends void | Promise<void> = void,
// >(write: Write<Update, Result>, initialValue?: Value) {
//   return atom(initialValue ?? null, write)
// }

export function immerAction<Update, Result extends void | Promise<void> = void>(
  write: ImmerWrite<Update, Result>,
): WritableAtom<null, Update, Result> {
  const anAtom: any = atom(null, (get, set, arg: Update) => {
    const setter: ImmerSetter = (atom, fn) => {
      const value = produce(get(atom), is(z.function(), fn) ? fn : () => fn)

      // @TODO: value is 'Value' but should be 'Update'?
      return set(atom, value as any)
    }

    return write(get, setter, arg)
  })

  return anAtom
}

export const select = selectAtom

export function derived<
  Value,
  Update,
  Result extends void | Promise<void> = void,
>(
  read: Read<Value>,
  write: Write<Update, Result>,
): WritableAtom<Value, Update, Result> {
  return atom(read, write)
}

type Getter = {
  <Value>(atom: Atom<Value | Promise<Value>>): Value
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  <Value>(atom: Atom<Promise<Value>>): Value
  <Value>(atom: Atom<Value>): Awaited<Value>
}

export function atomAction<
  Value,
  Arg,
  Result extends void | Promise<void> = void,
>(
  signal: WritableAtom<Value, any, Result>,
  fn: (draft: Draft<Value>, arg: Arg, get: Getter) => void,
) {
  return atom(null, (get, set, arg: Arg) => {
    const value = produce(get(signal), draft => fn(draft, arg, get))
    return set(signal, value)
  })
}

export function action<Update, Result extends void | Promise<void> = void>(
  write: ImmerWrite<Update, Result>,
): WritableAtom<null, Update, Result>

export function action<Value, Arg, Result extends void | Promise<void> = void>(
  signal: WritableAtom<Value, any, Result>,
  fn: (draft: Draft<Value>, arg: Arg, get: Getter) => void,
): WritableAtom<null, Arg, Result>

export function action(...args: [any] | [any, any]): any {
  return args.length === 1 ? immerAction(...args) : atomAction(...args)
}
