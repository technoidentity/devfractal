import type { PrimitiveAtom, WritableAtom } from 'jotai'
import { atom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import type { Read, Write } from './types'

export function atoms<Value>() {
  return atom<PrimitiveAtom<Value>[]>([])
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
