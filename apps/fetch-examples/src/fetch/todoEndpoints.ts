/* eslint-disable @typescript-eslint/naming-convention */
import { Todo } from '@srtp/todo'
import { z } from 'zod'
import { type Endpoint, type ZodPrimitive } from './endpoint'

export const todoEndpoints = {
  getTodos: { path: ['todos'], method: 'get', response: z.array(Todo) },

  deleteTodo: { path: ['todos', { id: z.number() }], method: 'delete' },

  createTodo: {
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
} as const satisfies Record<string, Endpoint>

export function restEndpoints<
  Spec extends z.ZodRawShape & { id: ZodPrimitive },
  Query extends z.ZodRawShape | z.AnyZodObject,
>(rawSpec: Spec, options: { name: string }, query: Query) {
  const spec = z.object(rawSpec)
  const request = query instanceof z.ZodObject ? query : z.object(query)

  const getAll: Endpoint = {
    path: [options.name],
    method: 'get',
    response: z.array(spec),
    request,
  }

  const create: Endpoint = {
    path: [options.name],
    method: 'post',
    request: spec.omit({ id: true }),
    response: Todo,
  }

  const update: Endpoint = {
    path: [options.name, { id: rawSpec['id'] }],
    method: 'put',
    request: Todo,
    response: Todo,
  }

  const remove: Endpoint = {
    path: [options.name, { id: z.number() }],
    method: 'delete',
  }

  return { getAll, create, update, remove }
}
