import { State } from '@srtp/todo'

export const filteredTodosSelector = (snap: State) => {
  const todoList = Array.from(snap.todos.values())
  return snap.filter === 'All'
    ? todoList
    : snap.filter === 'Completed'
    ? todoList.filter(t => t.completed)
    : todoList.filter(t => !t.completed)
}

export const filterSelector = (snap: State) => snap.filter
