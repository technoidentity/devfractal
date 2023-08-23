import { jlog } from '@srtp/core'
import { isStr, jstr } from '@srtp/core'
import type { StatusCodes } from 'http-status-codes'
import { getReasonPhrase } from 'http-status-codes'

export class HTTPError extends Error {
  readonly status: StatusCodes

  // @TODO: allow message of any type?
  constructor(status: StatusCodes, message?: string) {
    super(message)
    this.status = status
  }

  statusText() {
    return getReasonPhrase(this.status)
  }
}

export const internalServerError = (message?: string) =>
  new HTTPError(500, message)

export const badRequest = (message?: string) => new HTTPError(400, message)

export type FailureResponse = Readonly<{
  status: number
  json: Readonly<{ error: string } | { errors: readonly string[] }>
}>

export type SuccessResponse<T> = Readonly<{
  status: number
  json: T
}>

export type Response<T> = FailureResponse | SuccessResponse<T>

export const failure = (err: any): FailureResponse => {
  if (err instanceof Error) {
    console.trace(err)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  jlog({ 'server-error': err })
  if (err instanceof HTTPError) {
    return {
      status: err.status,
      json: { error: err.message || err.statusText() },
    }
  }

  let error: string
  if (err instanceof Error) {
    error = err.message
  } else if (isStr(err)) {
    error = err
  } else {
    error = `Unknown error:${jstr(err)}`
  }

  return { status: 500, json: { error } }
}

export const success = <T = any>(res: T): SuccessResponse<T> => {
  return { status: 200, json: res }
}

export const response = async <T>(
  fn: () => Promise<T>,
): Promise<Response<T>> => {
  return fn().then(success).catch(failure)
}
