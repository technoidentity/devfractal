/* eslint-disable */

if (typeof window === 'undefined') {
  const { server } = require('./server')
  server?.listen({
    onUnhandledRequest: ({ method, url }: any) => {
      if (
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/_next')
      ) {
        return
      }
      throw new Error(`Unhandled ${method} request to ${url}`)
    },
  })
} else {
  const { worker } = require('./browser')
  worker.start()
}

export { }
