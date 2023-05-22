import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import type { UpdateHandlers } from './types'
import { capitalize } from './useUpdate'

export function safeUpdateState<Spec extends z.AnyZodObject>(spec: Spec) {
  type T = z.infer<Spec>

  return function useSafeUpdate(
    initialState: T | (() => T),
  ): readonly [T, UpdateHandlers<T>] {
    const [state, set] = React.useState(initialState)

    const actions: UpdateHandlers<T> = React.useMemo(() => {
      const handlers: any = {}

      const keys = spec.keyof().options as string[]

      for (const key of keys) {
        handlers[`set${capitalize(key)}`] = (
          fn: (value: T[keyof T]) => T[keyof T],
        ) => {
          set(state => {
            const v = state[key]
            const nv = fn(v)
            return v === nv ? state : spec.parse({ ...state, [key]: nv })
          })
        }
      }

      invariant(
        handlers['update'] === undefined,
        'update is a reserved key for useUpdate',
      )
      handlers['update'] = (fn: (update: T) => Partial<T>) =>
        set(s => spec.parse({ ...s, ...fn(s) }))

      return handlers
    }, [])

    return [state, actions] as const
  }
}
