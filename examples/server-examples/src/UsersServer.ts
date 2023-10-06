import { epGet } from '@srtp/core'
import { User, usersList } from '@srtp/fake-tasks'
import { epRouter, type SEpsHandlers } from '@srtp/hono'
import { z } from 'zod'

const userEndpoints = {
  getUsers: epGet(['users'], z.array(User)),
}

const userHandlers = {
  getUsers: () => usersList(),
} satisfies SEpsHandlers<typeof userEndpoints>

export const tasksApp = epRouter(userEndpoints, userHandlers)
