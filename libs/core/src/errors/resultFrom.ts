import type { Result, ResultMatch } from './result'
import {
  fail,
  isOk,
  ok,
  resultFMap,
  resultMatch,
  resultMap,
  resultMapError,
  resultExpect,
} from './result'

export class ResultType<E, T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Result<E, T>) {}

  get isOk() {
    return isOk(this.res)
  }

  get isFail() {
    return !isOk(this.res)
  }

  get result() {
    return this.res
  }

  map<R>(fn: (v: T) => R): ResultType<E, R> {
    return result(resultMap(this.res, fn))
  }

  fmap<R>(fn: (v: T) => Result<E, R>): ResultType<E, R> {
    return result(resultFMap(this.res, fn))
  }

  mapError<E2>(fn: (err: E) => E2): ResultType<E2, T> {
    return result(resultMapError(this.res, fn))
  }

  match<E2, T2>(match: ResultMatch<E, T, E2, T2>) {
    return resultMatch(this.res, match)
  }

  expect(message?: string): T {
    return resultExpect(this.res, message)
  }
}

export function result<E, T>(result: Result<E, T>) {
  return new ResultType(result)
}

export function okResult<T>(value: T) {
  return result(ok(value))
}

export function failResult<E>(err: E) {
  return result(fail(err))
}
