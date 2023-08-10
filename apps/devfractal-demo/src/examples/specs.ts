import { boolean, number, string } from 'devfractal'
import { z } from 'zod'

export const Task = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})

export type Task = z.infer<typeof Task>

export const Filters = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})

export type Filters = z.infer<typeof Filters>
