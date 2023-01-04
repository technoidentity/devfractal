/* eslint-disable */

if (typeof window === 'undefined') {
  const s = require('./server')
  s?.server?.listen()
  // s.then(result => {
  //   const { server } = result
  //   server?.listen()
  // })
} else {
  const { worker } = require('./browser')
  worker.start()
}
