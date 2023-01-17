import ws from '@fastify/websocket'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import closeWithGrace from 'close-with-grace'
import { config } from 'dotenv'
import fastify from 'fastify'
import { createContext } from './context'
import { appRouter } from './router'
require('make-promises-safe') // installs an 'unhandledRejection' handler
// import autoload from '@fastify/autoload'

config()

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

server.register(fastifyTRPCPlugin, {
  useWSS: true,
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext },
})
;(async () => {
  try {
    await server.listen({ port: 3005 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()
