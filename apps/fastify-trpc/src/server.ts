import ws from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import closeWithGrace from 'close-with-grace'
import { config } from 'dotenv'
import fastify from 'fastify'
import { getFastifyPlugin } from 'trpc-playground/handlers/fastify'
import { createContext } from './context'
import { appRouter } from './router'
require('make-promises-safe') // installs an 'unhandledRejection' handler
// import autoload from '@fastify/autoload'

config()
const trpcEndpoint = '/trpc'
const playgroundEndpoint = '/trpc-playground'

const server = fastify({
  maxParamLength: 5000,
  logger: true,
})

server.register(ws)

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: Number(process.env['FASTIFY_CLOSE_GRACE_DELAY'] || 500) },
  async (options: any) => {
    if (options?.err) {
      server.log.error(options.err)
    }
    await server.close()
  },
)

server.addHook('onClose', (_, done) => {
  closeListeners.uninstall()
  done()
})

// fastify.register(autoLoad, {
//   dir: join(__dirname, 'routes'),
// })

getFastifyPlugin({
  trpcApiEndpoint: trpcEndpoint,
  playgroundEndpoint,
  router: appRouter,
}).then(plugin =>
  server
    .register(fastifyTRPCPlugin, {
      prefix: trpcEndpoint,
      trpcOptions: {
        router: appRouter,
        context: createContext,
      },
    })

    .register(plugin, { prefix: playgroundEndpoint }),
)
;(async () => {
  try {
    await server.listen({ port: 3005 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()