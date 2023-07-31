import type { Context } from 'hono'
import { StatusCodes } from 'http-status-codes'

type HeaderRecord = Record<string, string | string[]>

export function json<T>(
  c: Context,
  body: T,
  status?: StatusCodes,
  headers?: HeaderRecord,
) {
  return c.json({ data: body }, status, headers)
}

export function created<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.json({ data: body }, StatusCodes.CREATED, headers)
}

export function noContent<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.json({ data: body }, StatusCodes.NO_CONTENT, headers)
}

export function ok<T>(c: Context, body: T, headers?: HeaderRecord) {
  return c.json({ data: body }, StatusCodes.OK, headers)
}

// ERRORS

export function notFound(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.NOT_FOUND)
}

export function badRequest(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.BAD_REQUEST)
}

export function unauthorized(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.UNAUTHORIZED)
}

export function forbidden(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.FORBIDDEN)
}

export function internalServerError(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.INTERNAL_SERVER_ERROR)
}

export function requestTimeout(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.REQUEST_TIMEOUT)
}

export function serviceUnavailable(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.SERVICE_UNAVAILABLE)
}

export function notImplemented(c: Context, error?: string) {
  return c.json({ error }, StatusCodes.NOT_IMPLEMENTED)
}
