import { epRouter, type SEpsHandlers } from '@srtp/server'
import { epGet } from 'devfractal'
import type {} from 'hono'
import { z } from 'zod'

import { User, usersList } from './usersDb'

const userEndpoints = {
  getUsers: epGet(['users'], z.array(User)),
}

const userHandlers = {
  getUsers: () => usersList(),
} satisfies SEpsHandlers<typeof userEndpoints>

export const tasksApp = epRouter(userEndpoints, userHandlers)
