import React from 'react'
import invariant from 'tiny-invariant'
import type { State } from '@srtp/todo'
import { initialState } from '@srtp/todo'
import { todoReducer } from './reducer'

export type ReducerContext = {
  state: State
  dispatch: React.Dispatch<any>
}

const Context = React.createContext<ReducerContext | undefined>(undefined)

export const ReducerProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState)

  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useState = () => {
  const ctx = React.useContext(Context)
  invariant(ctx !== undefined, 'Use ReducerProvider somewhere')

  return ctx.state
}

export const useDispatch = () => {
  const ctx = React.useContext(Context)
  invariant(ctx !== undefined, 'Use ReducerProvider somewhere')

  return ctx.dispatch
}
