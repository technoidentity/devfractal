import type { CreateTask, Task } from '@srtp/fake-tasks'
import { createTask } from '@srtp/fake-tasks'
import { propsState } from '@srtp/react'

import { initialState } from '@/initialTasks'

const state = propsState<object>()

export const useTodo = state(initialState, {
  createTodo: (todo: CreateTask) => state => {
    const created = createTask(todo)
    state.tasks.set(created.id, created)
  },

  deleteTodo: (id: number) => state => {
    state.tasks.delete(id)
  },

  editTodo: (todo: Task) => state => {
    const editTodo = state.tasks.get(todo.id)
    state.tasks.set(todo.id, { ...editTodo, ...todo })
  },

  toggleTodo: (id: number) => state => {
    const toggleTodo = state.tasks.get(id)
    if (toggleTodo) {
      toggleTodo.completed = !toggleTodo.completed
    }
  },
})
