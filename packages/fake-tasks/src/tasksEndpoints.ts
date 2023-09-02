import { epDelete, epGet, epPatch, epPost, eps } from '@srtp/core'
import { z } from 'zod'
import { Search, Task } from './specs'

export const taskEndpoints = eps({
  getTasks: epGet(['tasks'], z.array(Task), Search),

  removeTask: epDelete(['tasks', { id: z.coerce.number() }]),

  addTask: epPost(['tasks'], Task.omit({ id: true }), Task),

  updateTask: epPatch(
    ['tasks', { id: z.coerce.number() }],
    Task.partial(),
    Task,
  ),
})
