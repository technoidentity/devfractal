import { number } from '@srtp/core'
import { CreateTask, Task, createTask } from '@srtp/fake-tasks'
import { safeAction, safeActions, safeReducer, tree$ } from '@srtp/react'
import type { z } from 'zod'

import { State, initialState } from '@/initialTasks'

const TaskAction = safeActions([
  safeAction('createTask', CreateTask),
  safeAction('deleteTask', number()),
  safeAction('toggleTask', number()),
  safeAction('editTask', Task),
])

export type TaskAction = Readonly<z.infer<typeof TaskAction>>

export const taskReducer = safeReducer(
  State,
  TaskAction,
)({
  createTask(state, payload) {
    const created = createTask(payload)
    state.tasks.set(created.id, created)
  },

  deleteTask(state, payload) {
    state.tasks.delete(payload)
  },

  editTask(state, payload) {
    const editTask = state.tasks.get(payload.id)
    state.tasks.set(payload.id, { ...editTask, ...payload })
  },

  toggleTask(state, payload) {
    const toggleTask = state.tasks.get(payload)
    if (toggleTask) {
      toggleTask.completed = !toggleTask.completed
    }
  },
})

export const { Provider, useDispatch, useSelect, useValue } = tree$(
  initialState,
  taskReducer,
)
