import { z } from 'zod'

export const Goal = z.object({
  id: z.number(),
  text: z.string(),
  progress: z.number(),
})

export type Goal = z.infer<typeof Goal>

export type GoalsReturnValues = {
  goalsData: Goal[]
}
