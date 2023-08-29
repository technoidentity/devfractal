import { epDelete, epGet, epPatch, epPost, eps } from 'devfractal'
import { z } from 'zod'

import { Filters, Task } from './specs'

export const taskEndpoints = eps({
  getTasks: epGet(['tasks'], z.array(Task), Filters),

  removeTask: epDelete(['tasks', { id: z.coerce.number() }]),

  addTask: epPost(['tasks'], Task.omit({ id: true }), Task),

  updateTask: epPatch(
    ['tasks', { id: z.coerce.number() }],
    Task.partial(),
    Task,
  ),
})
