import { z } from 'zod'
import type { EndpointBase } from '@srtp/endpoint'
import { Filters, Todo } from './todoDb'

export const todoEndpoints = {
  getTodos: {
    path: ['todos'],
    request: Filters,
    response: z.array(Todo),
    method: 'get',
  },

  removeTodo: { path: ['todos', { id: z.coerce.number() }], method: 'delete' },

  addTodo: {
    path: ['todos'],
    method: 'post',
    request: Todo.omit({ id: true }),
    response: Todo,
  },

  updateTodo: {
    path: ['todos', { id: z.coerce.number() }],
    method: 'patch',
    request: Todo,
    response: Todo,
  },
} as const satisfies Record<string, EndpointBase>
