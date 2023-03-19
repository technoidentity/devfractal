import { strict } from '@srtp/core'
import { z } from 'zod'
import { cast } from '@srtp/spec'

export const Todo = strict({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

export const Filter = z.enum(['All', 'Completed', 'Incomplete'])
export type Filter = z.infer<typeof Filter>

export type Todo = z.infer<typeof Todo>

export const CreateTodo = Todo.omit({ id: true })
export type CreateTodo = z.infer<typeof CreateTodo>

let nextId = 1000

export function createTodo(todo: CreateTodo): Todo {
  return { ...cast(CreateTodo, todo), id: nextId++ }
}

export const State = z.object({
  todos: z.map(z.number(), Todo),
  filter: Filter,
})

export type State = z.infer<typeof State>
