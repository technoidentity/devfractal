import { atom } from 'jotai'

type State = {
  todos: string[]
  ongoing: string[]
  completed: string[]
}

export const initialState: State = {
  todos: [],
  ongoing: [],
  completed: [],
}

export const draggedTaskAtom = atom<string>('')
