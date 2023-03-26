import { expect, test } from 'vitest'
import { fibo } from './fibo'

test('fib', () => {
  expect(fibo(0).hasNext()).toBe(false)
  expect(() => fibo(0).next()).toThrow()

  expect(fibo(1).next()).toBe(1)

  const one = fibo(1)
  expect(one.hasNext()).toBe(true)
  expect(one.next()).toBe(1)
  expect(one.hasNext()).toBe(false)

  const two = fibo(5)
  expect(two.hasNext()).toBe(true)
  expect(two.next()).toBe(1)
  expect(two.hasNext()).toBe(true)
  expect(two.next()).toBe(1)
  expect(two.hasNext()).toBe(true)
  expect(two.next()).toBe(2)
  expect(two.hasNext()).toBe(true)
  expect(two.next()).toBe(3)
  expect(two.hasNext()).toBe(true)
  expect(two.next()).toBe(5)
  expect(two.hasNext()).toBe(false)
})
