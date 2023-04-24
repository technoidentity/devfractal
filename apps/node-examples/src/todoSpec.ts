import { z } from 'zod'

export const TodoID = z.coerce.number().int().positive()
export type TodoID = z.infer<typeof TodoID>

export const Todo = z.object({
  id: TodoID,
  title: z.string(),
  completed: z.coerce.boolean(),
})
export type Todo = z.infer<typeof Todo>

export const PostTodo = Todo.omit({ id: true })
export type PostTodo = z.infer<typeof PostTodo>
