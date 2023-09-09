import { cast, isFunction } from '@srtp/core'
import React from 'react'
import type { z } from 'zod'

import { useEvent } from '../useEvent'

// Use this function only to interface with lower level APIs and state is simple.
export function useSafeState<S extends z.ZodTypeAny>(
  spec: S,
  initialValue: z.infer<S> | (() => z.infer<S>),
) {
  const init: z.infer<S> = React.useMemo(
    () => cast(spec, isFunction(initialValue) ? initialValue() : initialValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [value, set] = React.useState(init)

  const setValue = useEvent(
    (value: z.infer<S> | ((prev: z.infer<S>) => z.infer<S>)) => {
      set(prev => cast(spec, isFunction(value) ? value(prev) : value))
    },
  )

  return [value, setValue] as const
}
