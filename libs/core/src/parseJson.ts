import { cast } from '@srtp/spec'
import type { z } from 'zod'

export function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.log('parsing error on', { value })
    return undefined
  }
}

export function safeJSON<S extends z.ZodTypeAny>(spec: S) {
  return (value: string | null) => cast(spec, parseJSON(value))
}
