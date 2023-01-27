import produce from 'immer'
import { atom, PrimitiveAtom, WritableAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { ImmerSetter, ImmerWrite, Read, Write } from './types'

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

export function action<
  Value,
  Update,
  Result extends void | Promise<void> = void,
>(write: Write<Update, Result>, initialValue?: Value) {
  return atom(initialValue ?? null, write)
}

export function immerAction<
  Value,
  Update,
  Result extends void | Promise<void> = void,
>(
  write: ImmerWrite<Update, Result>,
  initialValue?: Value,
): WritableAtom<Value, Update, Result> {
  const anAtom: any = atom(initialValue ?? null, (get, set, arg: Update) => {
    const setter: ImmerSetter = (atom, fn) => {
      const value = produce(get(anAtom), fn as any)

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
