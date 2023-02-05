import { Either, eitherFlatMap, eitherMap, isLeft, left } from './either'

class EitherFrom<Left, Right> {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly res: Either<Left, Right>) {}
  map<R>(fn: (x: Right) => R) {
    return new EitherFrom(eitherMap(this.res, fn))
  }

  fmap<Result>(fn: (x: Right) => Either<Left, Result>) {
    return new EitherFrom(eitherFlatMap(this.res, fn))
  }

  errMap(fn: (err: Left) => Left) {
    return isLeft(this.res)
      ? new EitherFrom(left<Left, Right>(fn(this.res.error)))
      : this
  }

  get result() {
    return this.res
  }
}

export function tryFrom<Left, Right>(result: Either<Left, Right>) {
  return new EitherFrom(result)
}
