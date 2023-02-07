export type Ok<T> = Readonly<{ type: 'ok'; value: T }>
export type Err<E> = Readonly<{ type: 'fail'; fail: E }>
export type Result<E, T> = Err<E> | Ok<T>

export function isOk<Error, T>(result: Result<Error, T>): result is Ok<T> {
  return result.type === 'ok'
}

export function isFail<Error, T>(
  result: Result<Error, T>,
): result is Err<Error> {
  return result.type === 'fail'
}

export function ok<Error, T>(value: T): Result<Error, T> {
  return { type: 'ok', value }
}

export function fail<Error, T>(fail: Error): Result<Error, T> {
  return { type: 'fail', fail }
}

export function resultMap<E, A, R>(
  result: Result<E, A>,
  f: (x: A) => R,
): Result<E, R> {
  return result.type === 'fail' ? result : ok(f(result.value))
}

export function resultFlatMap<E, A, R>(
  result: Result<E, A>,
  f: (x: A) => Result<E, R>,
): Result<E, R> {
  const r = resultMap(result, f)

  return isFail(r) ? r : r.value
}

export type ResultMatch<E, T, E2, T2> = {
  ok(x: T): T2
  fail(e: E): E2
}

export function match<E, T, E2, T2>(
  result: Result<E, T>,
  match: ResultMatch<E, T, E2, T2>,
): Result<E2, T2> {
  return isOk(result)
    ? ok(match.ok(result.value))
    : fail(match.fail(result.fail))
}

// export function etry<Error, T>(fn: () => T): Result<Error, T> {
//   try {
//     return ok(fn())
//   } catch (fail) {
//     return fail(fail)
//   }
// }
