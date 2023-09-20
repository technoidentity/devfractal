import { act, renderHook } from '@testing-library/react'
import { test, expect, expectTypeOf } from 'vitest'

import { state } from './localState'
import type { Handlers } from './types'

test('state', () => {
  const initialState = { count: 0 }

  const handlers = {
    inc(draft) {
      draft.count += 1
    },
    dec(draft) {
      draft.count -= 1
    },
  } satisfies Handlers<typeof initialState>

  expectTypeOf(state(initialState, handlers)).toBeFunction()

  const { result } = renderHook(() => state(initialState, handlers)())

  expectTypeOf(result.current[0]).toMatchTypeOf<typeof initialState>()
  expectTypeOf(result.current[1]).toMatchTypeOf<typeof handlers>()
  expect(result.current[0]).toEqual({ count: 0 })

  act(() => {
    result.current[1].inc()
  })
  expect(result.current[0]).toEqual({ count: 1 })

  act(() => {
    result.current[1].dec()
  })
  expect(result.current[0]).toEqual({ count: 0 })
})
