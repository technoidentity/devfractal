import { isObject, isStr, jstr } from '../types'

export function toError(err: unknown): Error {
  return err instanceof Error
    ? err
    : isObject(err) && 'message' in err && isStr(err.message)
    ? new Error(err.message)
    : new Error(jstr(err))
}
