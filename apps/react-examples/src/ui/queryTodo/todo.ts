import { boolean, number, string, z } from 'zod'

export const Todo = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
export type Todo = z.infer<typeof Todo>

export const TodoList = z.array(Todo)
export type TodoList = z.infer<typeof TodoList>
