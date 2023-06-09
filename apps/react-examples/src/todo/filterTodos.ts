import type { Filter, Todo } from './types'

export const filterTodos = (todos: readonly Todo[], fltr: Filter) => {
  switch (fltr) {
    case 'All':
      return todos

    case 'Active':
      return todos.filter(todo => !todo.completed)

    case 'Completed':
      return todos.filter(todo => todo.completed)
  }
}
