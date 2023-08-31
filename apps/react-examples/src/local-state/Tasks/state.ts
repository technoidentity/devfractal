import { createTask, TaskFilter, type Task } from '@srtp/fake-tasks'
import { tree } from '@srtp/react'

import { initialState } from '@/initialTasks'

export const { Provider, actions, useAction, useValue, useSelect } = tree(
  initialState,
  {
    createTask(draft, payload: Task) {
      const created = createTask(payload)
      draft.tasks.set(created.id, created)
    },

    deleteTask(draft, payload: number) {
      draft.tasks.delete(payload)
    },

    editTask(draft, payload: Task) {
      const editTask = draft.tasks.get(payload.id)
      draft.tasks.set(payload.id, { ...editTask, ...payload })
    },

    toggleTask(draft, payload: number) {
      const toggleTask = draft.tasks.get(payload)
      if (toggleTask) {
        toggleTask.completed = !toggleTask.completed
      }
    },
    setFilter(draft, payload: TaskFilter) {
      draft.filter = payload
    },
  },
)
