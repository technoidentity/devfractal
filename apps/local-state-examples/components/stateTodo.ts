import { cstate } from '@srtp/local-state'
import type { CreateTodo, Todo } from '@srtp/todo'
import { createTodo, initialState } from '@srtp/todo'

export const useTodo = cstate(initialState, {
  createTodo: (todo: CreateTodo) => state => {
    const created = createTodo(todo)
    state.todos.set(created.id, created)
  },

  deleteTodo: (id: number) => state => {
    state.todos.delete(id)
  },

  editTodo: (todo: Todo) => state => {
    const editTodo = state.todos.get(todo.id)
    state.todos.set(todo.id, { ...editTodo, ...todo })
  },

  toggleTodo: (id: number) => state => {
    const toggleTodo = state.todos.get(id)
    if (toggleTodo) {
      toggleTodo.completed = !toggleTodo.completed
    }
  },
})