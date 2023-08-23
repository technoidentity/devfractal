import type { EndpointBase } from '@srtp/endpoint'
import {} from '@srtp/endpoint'
import { boolean, number, string } from '@srtp/core'
import { z } from 'zod'

export const Todo = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
export type Todo = z.infer<typeof Todo>

export const Filters = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})

export type Filters = z.infer<typeof Filters>

export const todoEndpoints = {
  getTodos: {
    path: ['todos'],
    request: Filters,
    response: z.array(Todo),
    method: 'get',
  },

  removeTodo: {
    path: ['todos', { id: z.coerce.number() }],
    method: 'delete',
    request: z.undefined(),
    response: z.undefined(),
  },

  addTodo: {
    path: ['todos'],
    method: 'post',
    request: Todo.omit({ id: true }),
    response: Todo,
  },

  updateTodo: {
    path: ['todos', { id: z.coerce.number() }],
    method: 'patch',
    request: Todo.omit({ id: true }).partial(),
    response: Todo,
  },
} as const satisfies Record<string, EndpointBase>
