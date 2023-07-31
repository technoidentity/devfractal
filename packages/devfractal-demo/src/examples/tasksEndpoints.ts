import type { EndpointBase } from '@srtp/endpoint'
import {} from '@srtp/endpoint'

import { z } from 'zod'
import { Filters, Task } from './specs'

export const taskEndpoints = {
  getTasks: {
    path: ['tasks'],
    request: Filters,
    response: z.array(Task),
    method: 'get',
  },

  removeTask: { path: ['tasks', { id: z.coerce.number() }], method: 'delete' },

  addTask: {
    path: ['tasks'],
    method: 'post',
    request: Task.omit({ id: true }),
    response: Task,
  },

  updateTask: {
    path: ['tasks', { id: z.coerce.number() }],
    method: 'patch',
    request: Task.omit({ id: true }).partial(),
    response: Task,
  },
} as const satisfies Record<string, EndpointBase>
