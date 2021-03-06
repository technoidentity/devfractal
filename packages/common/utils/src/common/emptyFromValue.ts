import { Array, boolean, number, string, UnknownRecord } from 'io-ts'
import { date } from 'io-ts-types/lib/date'
import { warn } from './assertions'
import { buildObject, today } from './common'

function emptyFromPrimitiveValue(v: unknown): any {
  if (number.is(v)) {
    return 0
  }

  if (string.is(v)) {
    return ''
  }

  if (boolean.is(v)) {
    return false
  }

  // tslint:disable-next-line: no-null-keyword
  if (v == null) {
    return v
  }

  if (date.is(v)) {
    return today()
  }

  warn(false, `Unsupported value ${v}`)
}

function emptyFromObjectValue<T extends {}>(value: T): T {
  return buildObject(value, emptyFromValue) as any
}

export const emptyFromValue: <T>(value: T) => T = value => {
  if (Array.is(value)) {
    return []
  }

  if (UnknownRecord.is(value)) {
    return emptyFromObjectValue(value)
  }

  return emptyFromPrimitiveValue(value)
}
