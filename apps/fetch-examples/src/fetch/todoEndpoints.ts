import { Todo } from '@srtp/todo'
import { z } from 'zod'
import { type EndpointBase } from '@srtp/fetch'

export const todoEndpoints = {
  getTodos: {
    path: ['todos'],
    response: z.array(Todo),
    method: 'get',
  },

  removeTodo: {
    path: ['todos', { id: z.number() }],
    method: 'delete',
  },

  addTodo: {
    path: ['todos'],
    method: 'post',
    request: Todo.omit({ id: true }),
    response: Todo,
  },

  updateTodo: {
    path: ['todos', { id: z.number() }],
    method: 'put',
    request: Todo,
    response: Todo,
  },
} as const satisfies Record<string, EndpointBase>
