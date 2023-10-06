import { isDefined } from '@srtp/core'
import bodyParser from 'body-parser'
import express from 'express'
import pino, { type Options } from 'pino-http'

export type ServerOptions = Readonly<{
  logOptions: Options
  static?: string
}>

export const server = (
  port: number,
  options?: ServerOptions,
  cb?: () => void,
) => {
  const app = express()

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  if (isDefined(options) && isDefined(options.static)) {
    app.use(express.static(options?.static))
  }

  app.use(pino(options?.logOptions))

  // @TODO: error handling?

  return app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on port ${port}`)

    cb?.()
  })
}
