import { expect, test } from 'vitest'
import { point } from './point'

test('point', () => {
  expect(point(1, 2).x()).toBe(1)
  expect(point(1, 2).y()).toBe(2)
  expect(point(3, 4).distanceFromOrigin()).toBeCloseTo(5)

  const pt = point(3, 4)
  pt.moveBy(1, 1)
  expect([pt.x(), pt.y()]).toEqual([4, 5])
})
