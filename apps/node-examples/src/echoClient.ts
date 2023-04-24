import { createConnection } from 'node:net'

const client = createConnection({ port: 8080 }, () => {
  console.log('Connected to server')
  client.write('Hello, server!')
})

client.on('data', data => {
  console.log(`Received: ${data.toString()}`)
})

client.on('close', () => {
  console.log('Disconnected from server')
})
