import { toArray } from '@srtp/fn'

import type { State } from '@/initialTasks'

export const filteredTasksSelector = (snap: State) => {
  const todoList = toArray(snap.tasks.values())
  return snap.filter === 'All'
    ? todoList
    : snap.filter === 'Completed'
    ? todoList.filter(t => t.completed)
    : todoList.filter(t => !t.completed)
}

export const filterSelector = (snap: State) => snap.filter
