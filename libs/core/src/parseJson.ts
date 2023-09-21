import type { z } from 'zod'

import { cast } from './spec'

export function parseJSON(value: string | null): unknown {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    // eslint-disable-next-line no-console
    console.error('parsing error on', { value })

    return undefined
  }
}

export function safeJSON<S extends z.ZodTypeAny>(spec: S) {
  return (value: string | null) => cast(spec, parseJSON(value))
}
