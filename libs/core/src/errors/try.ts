import { Either, Left, left, Right, right } from './either'
import { toError } from './utils'

export type Try<T> = Either<Error, T>

export function etry<T>(fn: () => T): Try<T> {
  try {
    return right(fn())
  } catch (error) {
    return left(toError(error))
  }
}

export function success<T>(value: T): Try<T> {
  return { type: 'right', value }
}

// @TODO: let's take anything and convert to error?
export function failure<T>(error: unknown): Try<T> {
  return { type: 'left', error: toError(error) }
}

export function tryMap<A, R>(result: Try<A>, f: (x: A) => R): Try<R> {
  return result.type === 'left' ? result : right(f(result.value))
}

export function tryFlatMap<A, R>(result: Try<A>, f: (x: A) => Try<R>): Try<R> {
  const r = tryMap(result, f)

  return isFailure(r) ? r : r.value
}

export function isSuccess<T>(result: Try<T>): result is Right<T> {
  return result.type === 'right'
}

export function isFailure<T>(result: Try<T>): result is Left<Error> {
  return result.type === 'left'
}
