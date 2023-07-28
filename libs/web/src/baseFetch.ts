import { isEmpty, isKey } from '@srtp/core'
import { isObject, isStr } from '@srtp/spec'
import { getReasonPhrase } from 'http-status-codes'
export class ResponseError extends Error {
  constructor(
    readonly response: Response,
    readonly error: unknown,
    options?: ErrorOptions,
  ) {
    const statusText = isEmpty(response.statusText)
      ? getReasonPhrase(response.status)
      : response.statusText
    super(statusText, options)
    this.name = 'HTTPError'
  }
}

export class UnauthorizedError extends Error {
  constructor(
    readonly response: Response,
    options?: ErrorOptions,
  ) {
    super(`Fetch Error: Unauthorized(status: ${response.status}`, options)
    this.name = 'UnauthorizedError'
  }
}

export type FetchOptions = NonNullable<Parameters<typeof fetch>[1]>
export type BaseFetchOptions = Omit<FetchOptions, 'body'> & {
  body?: unknown
}

export function getDefaultFetchConfig(
  options?: BaseFetchOptions,
): BaseFetchOptions {
  const method = options?.method ?? (options?.body ? 'POST' : 'GET')

  const config: BaseFetchOptions = {
    ...options,
    method: method.toUpperCase(),
  }

  if (!options || !options.body) {
    return config
  }

  if (
    isStr(options.body) ||
    options.body instanceof Blob ||
    options.body instanceof ArrayBuffer ||
    options.body instanceof ReadableStream ||
    options.body instanceof FormData
  ) {
    return config
  }

  if (options.headers) {
    if (!isObject(options.headers)) {
      return config
    }

    const k = 'Content-Type'
    if (isKey(options.headers, k)) {
      const v = options.headers[k] as unknown
      if (isStr(v) && !v.includes('application/json')) {
        return config
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  config.headers = { 'Content-Type': 'application/json', ...options?.headers }
  config.body = JSON.stringify(options.body)

  return config
}

export async function getResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers?.get('Content-Type')

  if (contentType?.includes('application/json')) {
    return response.json()
  }

  if (contentType?.includes('text/plain')) {
    return response.text()
  }

  if (contentType?.includes('application/octet-stream')) {
    return response.blob()
  }

  if (response.status === 204 || response.status === 205) {
    return null
  }

  return response.body
}

export async function baseFetch(
  url: string,
  options?: BaseFetchOptions,
): Promise<readonly [unknown, Response]> {
  const config = getDefaultFetchConfig(options)

  const response = await fetch(url, config as FetchOptions)

  if (response.status === 401 || response.status === 403) {
    throw new UnauthorizedError(response)
  }

  if (response.ok) {
    const body = await getResponseBody(response)
    return [body, response] as const
  }

  const error = await getResponseBody(response)
  throw new ResponseError(response, error)
}

// transition function
export type AxiosOptions = BaseFetchOptions & { url: string }

export function axios(
  options: AxiosOptions,
): Promise<readonly [unknown, Response]> {
  return baseFetch(options.url, options)
}
