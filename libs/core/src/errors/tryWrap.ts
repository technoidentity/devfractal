import { left, right } from './either'
import { toError } from './utils'
import type { Try } from './try'

export function tryWrap<R, Args extends unknown[]>(
  fn: (...args: Args) => R,
): (...args: Args) => Try<R> {
  return (...args) => {
    try {
      return right(fn(...args))
    } catch (error) {
      return left(toError(error))
    }
  }
}
