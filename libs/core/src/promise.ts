export type PromiseState<T> =
  | { state: 'pending' }
  | { state: 'fulfilled'; value: T }
  | { state: 'rejected'; reason: any }

export function promiseState<T>(promise: Promise<T>): Promise<PromiseState<T>> {
  return Promise.race([
    promise.then(
      value => ({ state: 'fulfilled', value }),
      reason => ({ state: 'rejected', reason }),
    ),
    { state: 'pending' },
  ]) as Promise<PromiseState<T>>
}

export type PromiseMatch<T, R> = {
  rejected: (reason: any) => R
  fulfilled: (value: T) => R
}

export function promiseMatch<T, R>(
  promise: Promise<T>,
  matcher: PromiseMatch<T, R>,
): Promise<R> {
  return promise.then(
    value => matcher.fulfilled(value),
    reason => matcher.rejected(reason),
  )
}
