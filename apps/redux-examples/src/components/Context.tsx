import React from 'react'
import invariant from 'tiny-invariant'
import type { State } from '@srtp/todo'
import { initialState } from '@srtp/todo'
import { todoReducer } from './reducer'

export type StateContext = State

export type DispatchContext = React.Dispatch<any>

const StateContext = React.createContext<StateContext | undefined>(undefined)
const DispatchContext = React.createContext<DispatchContext | undefined>(
  undefined,
)

export const ReducerProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(todoReducer, initialState)

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export const useState = () => {
  const ctx = React.useContext(StateContext)
  invariant(ctx !== undefined, 'Use ReducerProvider somewhere')

  return ctx
}

export const useDispatch = () => {
  const ctx = React.useContext(DispatchContext)
  invariant(ctx !== undefined, 'Use ReducerProvider somewhere')

  return ctx
}
