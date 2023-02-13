import { fail, isOk, Result, resultFlatMap, resultMap } from './result'

class ResultFrom<E, T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Result<E, T>) {}
  map<R>(fn: (v: T) => R): ResultFrom<E, R> {
    return result(resultMap(this.res, fn))
  }

  fmap<R>(fn: (v: T) => Result<E, R>): ResultFrom<E, R> {
    return result(resultFlatMap(this.res, fn))
  }

  err<E2>(fn: (err: E) => E2): ResultFrom<E2, T> {
    return isOk(this.res)
      ? result<E2, T>(this.res)
      : result(fail<E2, T>(fn(this.res.fail)))
  }

  get result() {
    return this.res
  }
}

export function result<E, T>(result: Result<E, T>) {
  return new ResultFrom(result)
}
