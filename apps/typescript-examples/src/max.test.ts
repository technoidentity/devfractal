import { expect, test } from 'vitest'
import { max } from './max'

test('max', () => {
  expect(max(1, 2, 3)).toBe(3)
  expect(max(3, 3, 1)).toBe(3)
  expect(max(3, 3, 3)).toBe(3)
})
