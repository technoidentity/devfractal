import { proxyMap } from 'valtio/utils'
import type { CreateTodo, State, Todo } from '@srtp/todo'
import { createTodo as create, initialState } from '@srtp/todo'

export const state: State = {
  todos: proxyMap<number, Todo>(initialState.todos),
  filter: 'All',
}

export function createTodo(todo: CreateTodo) {
  const created = create(todo)
  state.todos.set(created.id, created)
}

export function deleteTodo(id: number) {
  state.todos.delete(id)
}

export function editTodo(todo: Todo) {
  const editTodo = state.todos.get(todo.id)
  state.todos.set(todo.id, { ...editTodo, ...todo })
}

export function toggleTodo(id: number) {
  const toggleTodo = state.todos.get(id)
  if (toggleTodo) {
    toggleTodo.completed = !toggleTodo.completed
  }
}
