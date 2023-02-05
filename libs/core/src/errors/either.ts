export type Right<T> = Readonly<{ type: 'right'; value: T }>
export type Left<E> = Readonly<{ type: 'left'; error: E }>
export type Either<E, T> = Left<E> | Right<T>

export function right<E, T>(value: T): Either<E, T> {
  return { type: 'right', value }
}

export function left<E, T>(error: E): Either<E, T> {
  return { type: 'left', error }
}

export function isLeft<E, T>(either: Either<E, T>): boolean {
  return either.type === 'left'
}

export function isRight<E, T>(either: Either<E, T>): boolean {
  return either.type === 'right'
}
