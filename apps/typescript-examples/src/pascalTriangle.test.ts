import { expect, test } from 'vitest'
import { pascalTriangle } from './pascalTriangle'

test('pascalTriangle', () => {
  expect([...pascalTriangle(5)].map(pl => [...pl])).toEqual([
    [1],
    [1, 1],
    [1, 2, 1],
    [1, 3, 3, 1],
    [1, 4, 6, 4, 1],
    [1, 5, 10, 10, 5, 1],
  ])
})
