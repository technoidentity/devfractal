import { createServer } from 'node:net'

const server = createServer(socket => {
  console.log('Client connected')

  socket.on('data', data => {
    const str = data.toString('utf8')
    console.log(`Received: ${str}`)
    socket.write(`Echo: ${str}`)
  })

  socket.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('Server started on port 8080')
})
