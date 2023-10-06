import { cast } from '@srtp/core'
import { StatusCodes } from 'http-status-codes'

import { MockResponseError, type MockContext } from './types'

type HeaderRecord = Record<string, string | string[]>

export function json<T>(
  c: MockContext,
  body: T,
  status = StatusCodes.OK,
  headers?: HeaderRecord,
) {
  return c.res(c.ctx.status(status), c.ctx.json({ data: body, headers }))
}

export function created<T>(c: MockContext, body: T, headers?: HeaderRecord) {
  return c.res(
    c.ctx.status(StatusCodes.CREATED),
    c.ctx.json({ data: body, headers }),
  )
}

export function noContent<T>(c: MockContext, body: T, headers?: HeaderRecord) {
  return c.res(
    c.ctx.status(StatusCodes.NO_CONTENT),
    c.ctx.json({ data: body, headers }),
  )
}

export function ok<T>(c: MockContext, body: T, headers?: HeaderRecord) {
  return c.res(
    c.ctx.status(StatusCodes.OK),
    c.ctx.json({ data: body, headers }),
  )
}

function verifyError(error?: MockResponseError) {
  return error ? cast(MockResponseError, error) : error
}

export function notFound(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.NOT_FOUND),
    c.ctx.json(verifyError(error)),
  )
}

export function badRequest(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.BAD_REQUEST),
    c.ctx.json(verifyError(error)),
  )
}

export function unauthorized(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.UNAUTHORIZED),
    c.ctx.json(verifyError(error)),
  )
}

export function forbidden(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.FORBIDDEN),
    c.ctx.json(verifyError(error)),
  )
}

export function internalServerError(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.INTERNAL_SERVER_ERROR),
    c.ctx.json(verifyError(error)),
  )
}

export function requestTimeout(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.REQUEST_TIMEOUT),
    c.ctx.json(verifyError(error)),
  )
}

export function serviceUnavailable(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.SERVICE_UNAVAILABLE),
    c.ctx.json(verifyError(error)),
  )
}

export function notImplemented(c: MockContext, error?: MockResponseError) {
  return c.res(
    c.ctx.status(StatusCodes.NOT_IMPLEMENTED),
    c.ctx.json(verifyError(error)),
  )
}
