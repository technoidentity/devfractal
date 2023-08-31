import { state } from '@srtp/react'

import { initialState } from './initialState'
import type { Filter } from './types'

let nextId = 4

export const useTodoState = state(initialState, {
  add(state, text: string) {
    state.tasks.push({
      id: nextId++,
      text,
      completed: false,
    })
  },

  toggle(state, id: number) {
    const todo = state.tasks.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  },

  setFilter(state, filter: Filter) {
    state.filter = filter
  },
})
