import { exhaustive } from 'exhaustive'

import type { Filter, Todo } from './types'

export const filterTodos = (todos: readonly Todo[], fltr: Filter) =>
  exhaustive(fltr, {
    All: () => todos,
    Active: () => todos.filter(todo => !todo.completed),
    Completed: () => todos.filter(todo => todo.completed),
  })
