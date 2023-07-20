import { cast } from '@srtp/spec'
import { HTTPException } from 'hono/http-exception'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export function throwNotFound(message?: string): never {
  throw new HTTPException(StatusCodes.NOT_FOUND, { message })
}

export function throwBadRequest(message?: string): never {
  throw new HTTPException(StatusCodes.BAD_REQUEST, { message })
}

export function throwUnauthorized(message?: string): never {
  throw new HTTPException(StatusCodes.UNAUTHORIZED, { message })
}

export function throwForbidden(message?: string): never {
  throw new HTTPException(StatusCodes.FORBIDDEN, { message })
}

export function throwInternalServerError(message?: string): never {
  throw new HTTPException(StatusCodes.INTERNAL_SERVER_ERROR, { message })
}

export const throwCast: typeof cast = (spec, value) => {
  try {
    return cast(spec, value)
  } catch (error) {
    if (error instanceof ZodError) {
      throwBadRequest(error.message)
    }
    throw error
  }
}

export function throwRequestTimeout(message?: string): never {
  throw new HTTPException(StatusCodes.REQUEST_TIMEOUT, { message })
}

export function throwServiceUnavailable(message?: string): never {
  throw new HTTPException(StatusCodes.SERVICE_UNAVAILABLE, { message })
}

export function throwNotImplemented(message?: string): never {
  throw new HTTPException(StatusCodes.NOT_IMPLEMENTED, { message })
}
