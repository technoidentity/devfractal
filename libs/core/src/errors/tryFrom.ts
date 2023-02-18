import type { Try } from './try'
import { failure, isFailure, tryFlatMap, tryMap } from './try'

class TryFrom<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Try<T>) {}
  map<R>(fn: (x: T) => R) {
    return new TryFrom(tryMap(this.res, fn))
  }
  fmap<R>(fn: (x: T) => Try<R>) {
    return new TryFrom(tryFlatMap(this.res, fn))
  }
  errMap(fn: (err: Error) => Error) {
    return isFailure(this.res)
      ? new TryFrom(failure<T>(fn(this.res.error)))
      : this
  }
  get result() {
    return this.res
  }
}

export function tryFrom<T>(result: Try<T>) {
  return new TryFrom(result)
}
