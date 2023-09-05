import { isObject, isStr } from '../spec'

export const toStringError = (err: unknown): string =>
  err instanceof Error
    ? err.message
    : isObject(err) && 'message' in err && isStr(err.message)
    ? err.message
    : `unexpected error: ${JSON.stringify(err)}`

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error(toStringError(err))
