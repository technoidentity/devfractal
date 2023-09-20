import { act, renderHook } from '@testing-library/react'
import { expect, expectTypeOf, test } from 'vitest'

import { propsState, type PropsStateHandlers } from './propsState'

test('propsState', () => {
  const initialState = { count: 1 }
  const props = { step: 2 }
  const handlers = {
    inc: () => (draft, props) => {
      draft.count += props.step
    },
    dec: () => (draft, props) => {
      draft.count -= props.step
    },
  } satisfies PropsStateHandlers<typeof props, typeof initialState>

  expectTypeOf(
    propsState<typeof props>()(initialState, handlers),
  ).toBeFunction()

  const { result } = renderHook(() =>
    propsState<typeof props>()(initialState, handlers)(props),
  )

  expectTypeOf(result.current[0]).toMatchTypeOf<typeof initialState>()
  expect(result.current[0]).toEqual({ count: 1 })

  act(() => {
    result.current[1].inc()
    result.current[1].inc()
  })
  expect(result.current[0]).toEqual({ count: 5 })

  act(() => {
    result.current[1].dec()
  })
  expect(result.current[0]).toEqual({ count: 3 })
})
