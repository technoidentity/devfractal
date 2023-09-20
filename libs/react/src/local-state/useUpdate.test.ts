import { act, renderHook } from '@testing-library/react'
import { expect, expectTypeOf, test } from 'vitest'

import type { UpdateHandlers } from './types'
import { useUpdate } from './useUpdate'

test('useUpdate', () => {
  const initialState = { count: 0, step: 1 }

  const { result } = renderHook(() => useUpdate(initialState))

  expectTypeOf(result.current[0]).toMatchTypeOf<typeof initialState>()
  expectTypeOf(result.current[1]).toMatchTypeOf<
    UpdateHandlers<typeof initialState>
  >()

  act(() => {
    result.current[1].updateCount((count: number) => count + 1)
  })
  expect(result.current[0]).toEqual({ count: 1, step: 1 })

  act(() => {
    result.current[1].updateStep((step: number) => step * 2)
  })
  expect(result.current[0]).toEqual({ count: 1, step: 2 })

  act(() => {
    result.current[1].setCount(3)
  })
  expect(result.current[0]).toEqual({ count: 3, step: 2 })

  act(() => {
    result.current[1].setStep(4)
  })
  expect(result.current[0]).toEqual({ count: 3, step: 4 })

  act(() => {
    result.current[1].update((state: typeof initialState) => ({
      count: state.count + 2,
      step: state.step - 1,
    }))
  })
  expect(result.current[0]).toEqual({ count: 5, step: 3 })
})
