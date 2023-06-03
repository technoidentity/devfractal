import type { PrimitiveAtom, WritableAtom } from 'jotai'
import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import type { Read, Write } from './types'

export function signal<Value>(initialValue: Value) {
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

export const select = selectAtom

export function derived<Value, Args extends unknown[], Result extends void>(
  read: Read<Value>,
  write: Write<Args, Result>,
): WritableAtom<Value, Args, Result> {
  return atom(read, write)
}
