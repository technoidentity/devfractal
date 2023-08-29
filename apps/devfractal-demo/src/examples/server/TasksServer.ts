import { epRouter, throwBadRequest, type SEpsHandlers } from '@srtp/server'
import type {} from 'hono'

import type { Task } from '../specs'
import { taskEndpoints } from '../tasksEndpoints'

import { createTask, removeTask, tasksList, updateTask } from './tasksDb'

const taskHandlers = {
  getTasks: ({ request: filters }) => tasksList(filters),

  removeTask: ({ params: { id } }) => {
    const task = removeTask(id)
    if (!task) {
      throwBadRequest('task not found')
    }
  },

  addTask: ({ request: body }): Task => {
    const task = createTask(body)
    if (!task) {
      throwBadRequest('task not found')
    }

    return task
  },

  updateTask: ({ params: { id }, request: body }): Task => {
    const task = updateTask(id, body)
    if (!task) {
      throwBadRequest('task not found')
    }

    return task
  },
} satisfies SEpsHandlers<typeof taskEndpoints>

export const tasksApp = epRouter(taskEndpoints, taskHandlers)
