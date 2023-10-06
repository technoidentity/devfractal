import { cast } from '@srtp/core'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

export class MockHTTPException extends Error {
  constructor(
    public readonly status: StatusCodes,
    { message }: { message?: string },
  ) {
    super(message)
  }
}

export function throwNotFound(message?: string): never {
  throw new MockHTTPException(StatusCodes.NOT_FOUND, { message })
}

export function throwBadRequest(message?: string): never {
  throw new MockHTTPException(StatusCodes.BAD_REQUEST, { message })
}

export function throwUnauthorized(message?: string): never {
  throw new MockHTTPException(StatusCodes.UNAUTHORIZED, { message })
}

export function throwForbidden(message?: string): never {
  throw new MockHTTPException(StatusCodes.FORBIDDEN, { message })
}

export function throwInternalServerError(message?: string): never {
  throw new MockHTTPException(StatusCodes.INTERNAL_SERVER_ERROR, { message })
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
  throw new MockHTTPException(StatusCodes.REQUEST_TIMEOUT, { message })
}

export function throwServiceUnavailable(message?: string): never {
  throw new MockHTTPException(StatusCodes.SERVICE_UNAVAILABLE, { message })
}

export function throwNotImplemented(message?: string): never {
  throw new MockHTTPException(StatusCodes.NOT_IMPLEMENTED, { message })
}
