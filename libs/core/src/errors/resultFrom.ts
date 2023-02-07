import { fail, isFail, Result, resultFlatMap, resultMap } from './result'

class ResultFrom<E, T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Result<E, T>) {}
  map<R>(fn: (x: T) => R) {
    return new ResultFrom(resultMap(this.res, fn))
  }

  fmap<R>(fn: (x: T) => Result<E, R>) {
    return new ResultFrom(resultFlatMap(this.res, fn))
  }

  errMap(fn: (err: E) => E) {
    return isFail(this.res)
      ? new ResultFrom(fail<E, T>(fn(this.res.fail)))
      : this
  }

  get result() {
    return this.res
  }
}

export function resultFrom<E, T>(result: Result<E, T>) {
  return new ResultFrom(result)
}
