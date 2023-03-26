import { expect, test } from 'vitest'

import { isPrime } from './isPrime'

test('isPrime', () => {
  expect(() => isPrime(5.5)).toThrow()
  expect(() => isPrime(-1)).toThrow()
  expect(isPrime(1)).toBeFalsy()
  expect(isPrime(4)).toBeFalsy()
  expect(isPrime(2)).toBeTruthy()
  expect(isPrime(5)).toBeTruthy()
  expect(isPrime(15)).toBeFalsy()
})
