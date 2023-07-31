import { epRouter, throwBadRequest, type SEpsHandlers } from '@srtp/server'

import { createTask, removeTask, tasksList, updateTask } from './tasksDb'
import type {} from 'hono'
import type { Task } from '../specs'
import { taskEndpoints } from '../tasksEndpoints'

const taskHandlers = {
  getTasks: ({ request: filters }) => tasksList(filters),

  removeTask: ({ params: { id } }) => removeTask(id),

  addTask: ({ request: body }): Task => {
    const todo = createTask(body)
    if (!todo) {
      throwBadRequest('todo not found')
    }

    return todo
  },

  updateTask: ({ params: { id }, request: body }): Task => {
    const todo = updateTask(id, body)
    if (!todo) {
      throwBadRequest('todo not found')
    }

    return todo
  },
} satisfies SEpsHandlers<typeof taskEndpoints>

export const tasksApp = epRouter(taskEndpoints, taskHandlers)
