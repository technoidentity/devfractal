import type { Reducer } from 'react'
import { useReducer } from 'react'

import { initialState } from './initialState'
import type { TodoAction, TodoState } from './types'

let nextId = 4
const todoReducer: Reducer<TodoState, TodoAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todoList: [
          ...state.todoList,
          { id: nextId++, text: action.text, completed: false },
        ],
      }

    case 'TOGGLE_TODO':
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      }

    case 'SET_FILTER':
      return { ...state, filter: action.filter }

    default:
      return state
  }
}

export function useTodos() {
  return useReducer(todoReducer, initialState)
}
