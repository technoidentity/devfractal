import { state } from '@srtp/local-state'
import { initialState } from './initialState'
import type { Filter } from './types'

let nextId = 4

export const useTodoState = state(initialState, {
  add(state, text: string) {
    state.todoList.push({
      id: nextId++,
      text,
      completed: false,
    })
  },

  toggle(state, id: number) {
    const todo = state.todoList.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  },

  setFilter(state, filter: Filter) {
    state.filter = filter
  },
})
