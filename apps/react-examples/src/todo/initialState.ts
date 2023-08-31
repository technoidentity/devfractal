import type { Todo, TodoState } from './types'

const initialTodos: readonly Todo[] = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Buy eggs', completed: false },
  { id: 3, text: 'Buy bread', completed: false },
]

export const initialState: TodoState = {
  filter: 'All',
  tasks: initialTodos,
}
