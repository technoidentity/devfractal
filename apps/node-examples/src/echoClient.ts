import { createConnection } from 'node:net'

const port = 8080

const client = createConnection({ port }, () => {
  console.log('Connected to server')
  client.write('Hello, server!')
})

client.on('data', data => {
  const str = data.toString('utf8')
  console.log(`Received: ${str}`)
})

client.on('close', () => {
  console.log('Disconnected from server')
})
