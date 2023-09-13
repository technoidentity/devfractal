import { useValue } from '@srtp/react'
import { atom } from 'jotai'
import React from 'react'
export const useToggle = (init = false) => {
  const [state, dispatch] = React.useReducer(state => !state, init)

  return [state, dispatch] as const
}

export const useCount = (init = 0) => {
  const [count, dispatch] = React.useReducer(
    (state: number, action: 'inc' | 'dec') =>
      action === 'inc' ? state + 1 : state - 1,
    init,
  )

  return [count, dispatch] as const
}

export const useForceUpdate = () => {
  const [, dispatch] = useCount()
  return React.useCallback(() => {
    dispatch('inc')
  }, [dispatch])
}

export function useAsync<T>(fn: () => Promise<T>) {
  const signal = React.useMemo(() => atom(fn), [fn])
  return useValue(signal)
}
