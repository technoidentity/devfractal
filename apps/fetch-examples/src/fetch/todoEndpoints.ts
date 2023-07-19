import { Todo } from '@srtp/todo'
import { z } from 'zod'
import type { EndpointBase } from '@srtp/endpoint'

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
    method: 'patch',
    request: Todo,
    response: Todo,
  },
} as const satisfies Record<string, EndpointBase>

// const todoHttp = epHttp(todoEndpoints)

// todoHttp.updateTodo({
//   path: { id: 1 },
//   request: { id: 1, title: 'hello', completed: false },
// })
