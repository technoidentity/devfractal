import React, { Reducer } from 'react'

function simpleReducer<T>(state: T, update: Partial<T>): T {
  return { ...state, ...update }
}

export function useUpdateState<T extends object>(initialState: T) {
  const [state, update] = React.useReducer(
    simpleReducer as Reducer<T, Partial<T>>,
    initialState,
  )

  return [state, update] as const
}
