import React from 'react'
import invariant from 'tiny-invariant'
import { initialState, State } from '@srtp/todo'
import { todoReducer } from './reducer'

export type ReducerContext = {
  state: State
  dispatch: Function
}

const Context = React.createContext<ReducerContext | undefined>(undefined)

export const ReducerProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState)

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
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
