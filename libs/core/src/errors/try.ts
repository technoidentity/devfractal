import { Either, Left, left, Right, right } from './either'
import { toError } from './toError'

export type Try<T> = Either<Error, T>

export function Try<T>(fn: () => T): Try<T> {
  try {
    return right(fn())
  } catch (error) {
    return left(toError(error))
  }
}

export function success<T>(value: T): Try<T> {
  return { type: 'right', value }
}

export function failure<T>(error: Error): Try<T> {
  return { type: 'left', error }
}

export function map<A, R>(result: Try<A>, f: (x: A) => R): Try<R> {
  return result.type === 'left' ? result : right(f(result.value))
}

export function flatMap<A, R>(result: Try<A>, f: (x: A) => Try<R>): Try<R> {
  const r = map(result, f)

  return isFailure(r) ? r : r.value
}

export function isSuccess<T>(result: Try<T>): result is Right<T> {
  return result.type === 'right'
}

export function isFailure<T>(result: Try<T>): result is Left<Error> {
  return result.type === 'left'
}
