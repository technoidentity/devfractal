import { epDelete, epGet, epPatch, epPost, eps } from '@srtp/core'
import { z } from 'zod'

import { TaskSearch, Task, User } from './specs'

export const taskEndpoints = eps({
  getTasks: epGet(['tasks'], z.array(Task), TaskSearch),

  removeTask: epDelete(['tasks', { id: z.coerce.number() }]),

  addTask: epPost(['tasks'], Task.omit({ id: true }), Task),

  updateTask: epPatch(
    ['tasks', { id: z.coerce.number() }],
    Task.partial(),
    Task,
  ),
})

export const userEndpoints = eps({
  getUsers: epGet(['users'], z.array(User), TaskSearch),

  removeUser: epDelete(['users', { id: z.coerce.number() }]),

  addUser: epPost(['users'], User.omit({ id: true }), User),

  updateUser: epPatch(
    ['users', { id: z.coerce.number() }],
    User.partial(),
    User,
  ),
})
