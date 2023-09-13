import { Task, TaskFilter } from '@srtp/fake-tasks'
import { z } from 'zod'

export const State = z.object({
  tasks: z.map(z.number(), Task),
  filter: TaskFilter,
})
export type State = z.infer<typeof State>

export const initialState: State = {
  tasks: new Map<number, Task>(),
  filter: 'All',
}
