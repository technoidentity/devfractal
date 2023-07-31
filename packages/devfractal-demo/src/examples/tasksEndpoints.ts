import type { EndpointBase } from '@srtp/endpoint'
import {} from '@srtp/endpoint'
import { boolean, number, string } from '@srtp/validator'
import { z } from 'zod'

export const Task = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
export type Task = z.infer<typeof Task>

export const Filters = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})
export type Filters = z.infer<typeof Filters>

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
