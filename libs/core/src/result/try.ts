import { toError } from './errorUtils'
import type { Result } from './result'
import { ok, fail } from './result'

export type Try<T> = Result<Error, T>

export function rtry<T>(fn: () => T): Try<T> {
  try {
    return ok(fn())
  } catch (e) {
    return fail(toError(e))
  }
}

export async function atry<T>(fn: () => Promise<T>): Promise<Try<T>> {
  try {
    return ok(await fn())
  } catch (e) {
    return fail(toError(e))
  }
}
