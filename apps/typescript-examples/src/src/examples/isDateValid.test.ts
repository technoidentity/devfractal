import { expect, test } from 'vitest'
import { isDateValid } from './isDateValid'

test('isDateValid', () => {
  expect(isDateValid({ year: 1000, month: 1, day: 1 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 0, day: 1 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 13, day: 1 })).toBeFalsy()
  expect(isDateValid({ year: 1900, month: 2, day: 29 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 1, day: 0 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 1, day: 32 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 2, day: 30 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 2, day: 29 })).toBeTruthy()
  expect(isDateValid({ year: 2001, month: 2, day: 29 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 4, day: 31 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 6, day: 31 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 9, day: 31 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 11, day: 31 })).toBeFalsy()
  expect(isDateValid({ year: 2000, month: 4, day: 30 })).toBeTruthy()
  expect(isDateValid({ year: 2000, month: 6, day: 30 })).toBeTruthy()
  expect(isDateValid({ year: 2000, month: 9, day: 30 })).toBeTruthy()
  expect(isDateValid({ year: 2000, month: 11, day: 30 })).toBeTruthy()
  expect(isDateValid({ year: 2000, month: 12, day: 31 })).toBeTruthy()
})
