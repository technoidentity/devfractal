import { act, renderHook } from '@testing-library/react'
import { tree, type Handlers } from 'devfractal'
import React from 'react'
import { expect, test } from 'vitest'

const initialState = { count: 0 }

const handlers = {
  inc(draft) {
    draft.count += 1
  },
  dec(draft) {
    draft.count -= 1
  },
} satisfies Handlers<typeof initialState>

const { Provider, useValue, useActions } = tree(initialState, handlers)

const TreeProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => <Provider>{children}</Provider>

test('tree', () => {
  const { result } = renderHook(
    () => ({ state: useValue(), actions: useActions() }),
    {
      wrapper: TreeProvider,
    },
  )

  expect(result.current.state.count).toBe(0)

  act(() => {
    result.current.actions.inc()
  })
  expect(result.current.state).toEqual({ count: 1 })

  act(() => {
    result.current.actions.dec()
  })
  expect(result.current.state).toEqual({ count: 0 })
})
