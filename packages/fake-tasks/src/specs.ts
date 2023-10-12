import { boolean, number, string } from '@srtp/core'
import { z } from 'zod'

export const User = z.object({
  id: number(),
  name: string(),
  email: string(),
  job: string(),
})
export type User = z.infer<typeof User>

export const Task = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
  userId: number().optional(),
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
})

export const TaskSearch = Search.extend({
  completed: boolean().optional(),
})
export type TaskSearch = z.infer<typeof TaskSearch>

export const UserSearch = Search.extend({
  job: string().optional(),
})
export type UserSearch = z.infer<typeof UserSearch>
