import { cast } from '@srtp/core'
import { StatusCodes } from 'http-status-codes'

import type { Context } from './router'
import { ResponseError } from './types'

type HeaderRecord = Record<string, string | string[]>

export function json<T>(
  c: Context,
  body: T,
  status = StatusCodes.OK,
  headers?: HeaderRecord,
) {
  return c.res.status(status).json({ data: body, headers })
}

export function created<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.res.status(StatusCodes.CREATED).json({ data: body, headers })
}

export function noContent<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.res.status(StatusCodes.NO_CONTENT).json({ data: body, headers })
}

export function ok<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.res.status(StatusCodes.OK).json({ data: body, headers })
}

function verifyError(error?: ResponseError) {
  return error ? cast(ResponseError, error) : error
}

export function notFound(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.NOT_FOUND).json(verifyError(error))
}

export function badRequest(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.BAD_REQUEST).json(verifyError(error))
}

export function unauthorized(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.UNAUTHORIZED).json(verifyError(error))
}

export function forbidden(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.FORBIDDEN).json(verifyError(error))
}

export function internalServerError(c: Context, error?: ResponseError) {
  return c.res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(verifyError(error))
}

export function requestTimeout(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.REQUEST_TIMEOUT).json(verifyError(error))
}

export function serviceUnavailable(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.SERVICE_UNAVAILABLE).json(verifyError(error))
}

export function notImplemented(c: Context, error?: ResponseError) {
  return c.res.status(StatusCodes.NOT_IMPLEMENTED).json(verifyError(error))
}
