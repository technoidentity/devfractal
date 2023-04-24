import { createServer } from 'node:net'

const server = createServer(socket => {
  console.log('Client connected')

  socket.on('data', data => {
    console.log(`Received: ${data.toString()}`)
    socket.write(`Echo: ${JSON.stringify(data)}`)
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
