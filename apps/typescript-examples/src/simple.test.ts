import { expect, it, test } from 'vitest'

import { isPerfect, isPrime, isSorted } from './simple'

test('isPrime', () => {
  expect(() => isPrime(5.5)).toThrow()
  expect(() => isPrime(-1)).toThrow()
  expect(isPrime(1)).toBeFalsy()
  expect(isPrime(4)).toBeFalsy()
  expect(isPrime(2)).toBeTruthy()
  expect(isPrime(5)).toBeTruthy()
  expect(isPrime(15)).toBeFalsy()
})

test('isSorted', () => {
  expect(isSorted([])).toBe(true)
  expect(isSorted([1])).toBe(true)
  expect(isSorted([1, 2])).toBe(true)
  expect(isSorted([2, 1])).toBe(false)
  expect(isSorted([1, 2, 3])).toBe(true)
  expect(isSorted([1, 3, 2])).toBe(false)
  expect(isSorted([1, 2, 3, 4])).toBe(true)
  expect(isSorted([1, 2, 4, 3])).toBe(false)
  expect(isSorted([1, 2, 3, 4, 5])).toBe(true)
})

it('isPerfect', () => {
  expect(isPerfect(1)).toBe(false)
  expect(isPerfect(2)).toBe(false)
  expect(isPerfect(3)).toBe(false)
  expect(isPerfect(6)).toBe(true)
  expect(isPerfect(12)).toBe(false)
  expect(isPerfect(28)).toBe(true)
  expect(isPerfect(496)).toBe(true)
  expect(isPerfect(8128)).toBe(true)
})
