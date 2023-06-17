import React from 'react'
import { useImmerReducer, type ImmerReducer } from 'use-immer'

export function usePersistentReducer<State, Action>(
  key: string,
  reducer: ImmerReducer<State, Action>,
  initialState: State,
) {
  const initial = React.useMemo(() => {
    const state = window.localStorage.getItem(key)
    return state ? JSON.parse(state) : initialState
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const [state, dispatch] = useImmerReducer(reducer, initial)

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, dispatch] as const
}
