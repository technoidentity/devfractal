import type { Result } from '@srtp/core'
import { result, rtry } from '@srtp/core'

export function dbTry<T>(fn: () => T): Result<string, T> {
  return result(rtry(fn)).err(e => e.message).result
}
