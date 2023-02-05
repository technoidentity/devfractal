import { failure, flatMap, isFailure, map, Try } from './try'

class From<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Try<T>) {}
  map<R>(fn: (x: T) => R) {
    return new From(map(this.res, fn))
  }
  fmap<R>(fn: (x: T) => Try<R>) {
    return new From(flatMap(this.res, fn))
  }
  errMap(fn: (err: Error) => Error) {
    return isFailure(this.res) ? new From(failure<T>(fn(this.res.error))) : this
  }
  get result() {
    return this.res
  }
}

export function from<T>(result: Try<T>) {
  return new From(result)
}
