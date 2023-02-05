export type Right<T> = Readonly<{ type: 'right'; value: T }>
export type Left<E> = Readonly<{ type: 'left'; error: E }>
export type Either<E, T> = Left<E> | Right<T>

export function right<E, T>(value: T): Either<E, T> {
  return { type: 'right', value }
}

export function left<E, T>(error: E): Either<E, T> {
  return { type: 'left', error }
}

export function isLeft<E, T>(either: Either<E, T>): either is Left<E> {
  return either.type === 'left'
}

export function isRight<E, T>(either: Either<E, T>): either is Right<T> {
  return either.type === 'right'
}

export function eitherMap<Left, Right, Result>(
  result: Either<Left, Right>,
  f: (x: Right) => Result,
): Either<Left, Result> {
  return result.type === 'left' ? result : right(f(result.value))
}

export function eitherFlatMap<Left, Right, Result>(
  result: Either<Left, Right>,
  f: (x: Right) => Either<Left, Result>,
): Either<Left, Result> {
  const r = eitherMap(result, f)

  return isLeft(r) ? r : r.value
}
