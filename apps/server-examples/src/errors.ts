import { cast } from '@srtp/spec'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export function notFound(message?: string) {
  throw new HTTPException(StatusCodes.NOT_FOUND, { message })
}

export function badRequest(message?: string) {
  throw new HTTPException(StatusCodes.BAD_REQUEST, { message })
}

export function unauthorized(message?: string) {
  throw new HTTPException(StatusCodes.UNAUTHORIZED, { message })
}

export function forbidden(message?: string) {
  throw new HTTPException(StatusCodes.FORBIDDEN, { message })
}

export function internalServerError(message?: string) {
  throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, { message })
}

export const throwCast: typeof cast = (spec, value) => {
  try {
    return cast(spec, value)
  } catch (error) {
    if (error instanceof ZodError) {
      throw badRequest(error.message)
    }
    throw error
  }
}
