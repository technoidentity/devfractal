import { z } from 'zod'

export const Todo = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

export type Todo = Readonly<z.infer<typeof Todo>>

export const Filter = z.enum(['All', 'Active', 'Completed'])
export type Filter = z.infer<typeof Filter>

export const TodoList = z.array(Todo)
export type TodoList = Readonly<z.infer<typeof TodoList>>

export const TodoState = z.object({
  todoList: TodoList,
  filter: Filter,
})
export type TodoState = Readonly<{
  todoList: TodoList
  filter: Filter
}>

export type TodoAction =
  | Readonly<{ type: 'ADD_TODO'; title: string }>
  | Readonly<{ type: 'TOGGLE_TODO'; id: number }>
  | Readonly<{ type: 'SET_FILTER'; filter: Filter }>
