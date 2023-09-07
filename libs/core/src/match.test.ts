import { expect, expectTypeOf, test } from 'vitest'
import { matchTag } from './match'

test('matchTag', () => {
  type Shape =
    | { type: 'circle'; radius: number }
    | { type: 'square'; size: string }
    | { type: 'triangle'; size: number }

  const area = (shape: Shape) =>
    matchTag(shape, 'type', {
      circle: ({ radius }) => Math.PI * radius ** 2,
      square: ({ size }) => size,
      triangle: ({ size }) => size,
    })

  expectTypeOf(area).toEqualTypeOf<(shape: Shape) => string | number>()

  expect(area({ type: 'square', size: '2' })).toBe('2')
  expect(area({ type: 'triangle', size: 2 })).toBe(2)
  expect(area({ type: 'circle', radius: 2 })).toBeCloseTo(Math.PI * 4)
})
