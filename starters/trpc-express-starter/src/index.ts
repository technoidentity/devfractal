// example from trpc github repo https://github.com/trpc/trpc/blob/main/examples/express-server/src/server.ts

import * as trpcExpress from '@trpc/server/adapters/express'
import express from 'express'
import { expressHandler } from 'trpc-playground/handlers/express'
import { appRouter } from './app-router'
import { createContext } from './trpc'
import { renderTrpcPanel } from 'trpc-panel'

const trpcApiEndpoint = '/api/trpc'
const playgroundEndpoint = '/api/trpc-playground'

async function main() {
  const app = express()

  app.use((req, _res, next) => {
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)

    next()
  })

  app.use(
    trpcApiEndpoint,
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  )

  app.use(
    playgroundEndpoint,
    await expressHandler({
      trpcApiEndpoint,
      playgroundEndpoint,
      router: appRouter,
      // uncomment this if you're using superjson
      // request: {
      //   superjson: true,
      // },
    }),
  )

  app.use('/panel', (_, res) => {
    return res.send(
      renderTrpcPanel(appRouter, { url: 'http://localhost:4000/trpc' }),
    )
  })

  app.get('/', (_req, res) => res.send('hello'))

  app.listen(2021, () => {
    console.log('listening on port 2021')
  })
}

main()
