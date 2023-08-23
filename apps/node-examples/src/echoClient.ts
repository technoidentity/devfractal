import { cast } from '@srtp/core'
import { createConnection } from 'node:net'
import { argv } from 'node:process'
import invariant from 'tiny-invariant'
import { z } from 'zod'

const client = (name: string) => {
  const port = 8080

  function delay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
  }

  let i = 0
  const client = createConnection({ port }, async () => {
    console.log('Connected to server')
    client.write(`Hello from ${name}, server!`)
  })

  client.on('data', async data => {
    const str = data.toString('utf8')
    console.log(`Received: ${str}`)
    await delay(1000)
    i += 1
    if (i < 10) {
      client.write(`Hello again from ${name}, server! ${i}`)
    } else {
      client.end()
    }
  })

  client.on('close', () => {
    console.log('Disconnected from server')
  })
}

const main = async () => {
  invariant(argv.length === 3, 'Usage: node echoClient.js <name>')
  const name = cast(z.string(), argv[2])

  client(name)
}

main().catch(console.error)
