import { atomWithReducer } from 'jotai/utils'

type State = number
type Action = { type: 'inc' | 'dec' }

const countReducer = (state: State, action: Action): State => {
  if (action.type === 'inc') {
    return state + 1
  }
  if (action.type === 'dec') {
    return state - 1
  }
  throw new Error('unknown action type')
}

export const countReducerAtom = atomWithReducer(0, countReducer)
