// Example from trpc github repo https://github.com/trpc/trpc/blob/main/examples/express-server/src/server.ts

import type { inferAsyncReturnType } from '@trpc/server'
import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUser = () => {
    if (req.headers.authorization !== 'secret') {
      return null
    }
    return {
      name: 'alex',
    }
  }

  return {
    req,
    res,
    user: getUser(),
  }
}

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

export const router: typeof t.router = t.router
export const publicProcedure: typeof t.procedure = t.procedure
