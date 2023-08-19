import type { State } from '@srtp/todo'
import { toArray } from '@srtp/fn'

export const filteredTodosSelector = (snap: State) => {
  const todoList = toArray(snap.todos.values())
  return snap.filter === 'All'
    ? todoList
    : snap.filter === 'Completed'
    ? todoList.filter(t => t.completed)
    : todoList.filter(t => !t.completed)
}

export const filterSelector = (snap: State) => snap.filter
