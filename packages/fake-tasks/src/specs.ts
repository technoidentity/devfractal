import { boolean, number, string } from '@srtp/core'
import { z } from 'zod'

export const Task = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
export type Task = z.infer<typeof Task>

export const TaskFilter = z.enum(['All', 'Completed', 'Incomplete'])
export type TaskFilter = z.infer<typeof TaskFilter>

export const CreateTask = Task.omit({ id: true })
export type CreateTask = z.infer<typeof CreateTask>

export const UpdateTask = Task.partial().extend({ id: Task.shape['id'] })
export type UpdateTask = z.infer<typeof UpdateTask>

export const Search = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})

export type Search = z.infer<typeof Search>

export const User = z.object({
  id: number(),
  name: string(),
  email: string(),
  job: string(),
})
export type User = z.infer<typeof User>
