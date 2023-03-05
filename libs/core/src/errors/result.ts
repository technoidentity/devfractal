import { toError } from './utils'

const OK = Symbol('OK')
const FAIL = Symbol('FAIL')

// @TODO: convert to class?
export type Ok<T> = Readonly<{ type: typeof OK; value: T }>
export type Err<E> = Readonly<{ type: typeof FAIL; fail: E }>
export type Result<E, T> = Err<E> | Ok<T>

export function isOk<Error, T>(result: Result<Error, T>): result is Ok<T> {
  return result.type === OK
}

export function isFail<Error, T>(
  result: Result<Error, T>,
): result is Err<Error> {
  return result.type === FAIL
}

export function ok<Error, T>(value: T): Result<Error, T> {
  return { type: OK, value }
}

export function fail<Error, T>(fail: Error): Result<Error, T> {
  return { type: FAIL, fail }
}

export function resultMap<E, A, R>(
  result: Result<E, A>,
  f: (x: A) => R,
): Result<E, R> {
  return result.type === FAIL ? result : ok(f(result.value))
}

export function resultFMap<E, A, R>(
  result: Result<E, A>,
  f: (x: A) => Result<E, R>,
): Result<E, R> {
  const r = resultMap(result, f)

  return isFail(r) ? r : r.value
}

export function resultMapError<E, T, E2>(
  res: Result<E, T>,
  fn: (err: E) => E2,
): Result<E2, T> {
  return isOk(res) ? res : fail<E2, T>(fn(res.fail))
}

export function resultExpect<E, T>(res: Result<E, T>, message?: string): T {
  if (isOk(res)) {
    return res.value
  }

  throw new Error(message ?? 'Expected result to be ok')
}

export type ResultMatch<E, T, E2, T2> = {
  ok(x: T): T2
  fail(e: E): E2
}

export function resultMatch<E, T, E2, T2>(
  result: Result<E, T>,
  match: ResultMatch<E, T, E2, T2>,
): Result<E2, T2> {
  return isOk(result)
    ? ok(match.ok(result.value))
    : fail(match.fail(result.fail))
}

export function rtry<T>(fn: () => T): Result<Error, T> {
  try {
    return ok(fn())
  } catch (e) {
    return fail(toError(e))
  }
}
