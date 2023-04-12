import type { Signal } from '@preact/signals'
import {
  signal as preactSignal,
  useSignal as usePreactSignal,
} from '@preact/signals'
import type { Draft } from 'immer'
import { produce } from 'immer'

export function signal<T>(
  value: T,
): readonly [Signal<T>, (fn: (draft: Draft<T>) => void) => void] {
  const s = preactSignal(value)
  const update = (fn: (draft: Draft<T>) => void) => {
    const value = s.value
    produce(value, fn)
  }

  return [s, update] as const
}

export function useSignal<T>(value: T) {
  const signal = usePreactSignal(value)

  const get = () => signal.value
  const update = (fn: (draft: Draft<T>) => void) => {
    const value = signal.value
    produce(value, fn)
  }

  return [get, update] as const
}
