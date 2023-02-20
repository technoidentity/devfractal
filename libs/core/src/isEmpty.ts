import { isArray, isObject, isStr } from './types'

export function isEmpty(x: unknown) {
  return (
    x === undefined ||
    x === null ||
    (isStr(x) && x.trim() === '') ||
    (isArray(x) && x.length === 0) ||
    (isObject(x) && Object.keys(x).length === 0)
  )
}
