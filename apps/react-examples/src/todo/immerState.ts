import type { Draft } from 'immer'
import { useImmerReducer } from 'use-immer'

import { initialState } from './initialState'
import type { TodoAction, TodoState } from './types'

let nextId = 4

const todoReducer = (state: Draft<TodoState>, action: TodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      state.tasks.push({
        id: nextId++,
        text: action.text,
        completed: false,
      })
      break

    case 'TOGGLE_TODO':
      const todo = state.tasks.find(todo => todo.id === action.id)
      if (todo) {
        todo.completed = !todo.completed
      }
      break

    case 'SET_FILTER':
      state.filter = action.filter
      break
  }
}

export function useImmerTodos() {
  return useImmerReducer(todoReducer, initialState)
}
