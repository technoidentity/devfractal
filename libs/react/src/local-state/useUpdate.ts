import { isFunction, isUndefined } from '@srtp/core'
import { capitalize } from '@srtp/fn'
import React from 'react'
import invariant from 'tiny-invariant'

import type { ShallowObject, UpdateHandlers } from './types'

export function useUpdate<T extends ShallowObject>(
  initialState: T | (() => T),
) {
  const init = React.useMemo(
    () => (isFunction(initialState) ? initialState() : initialState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [state, set] = React.useState(init)

  const actions: UpdateHandlers<T> = React.useMemo(() => {
    const handlers: any = {}

    for (const key of Object.keys(init)) {
      handlers[`update${capitalize(key)}`] = (
        fn: (value: T[keyof T]) => T[keyof T],
      ) => {
        set(s => ({ ...s, [key]: fn((s as any)[key]) }))
      }
      handlers[`set${capitalize(key)}`] = (v: T[keyof T]) => {
        set(s => ({ ...s, [key]: v }))
      }
    }

    invariant(
      isUndefined(handlers['update']),
      'update is a reserved key for useUpdate',
    )

    handlers['update'] = (fn: (update: T) => Partial<T>) =>
      set(s => ({ ...s, ...fn(s) }))

    return handlers
  }, [init])

  return [state, actions] as const
}
