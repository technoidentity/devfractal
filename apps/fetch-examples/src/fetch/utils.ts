export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export class ResponseError extends Error {
  constructor(
    readonly statusCode: Response['status'],
    readonly body?: unknown,
  ) {
    super(`Fetch Error with status: ${statusCode}`)
  }
}

export const get = async (url: string, options?: { signal: AbortSignal }) => {
  await delay(1000 + 1000 * Math.random())

  const response = await fetch(url, { signal: options?.signal })
  const json = await response.json()

  if (!response.ok) {
    throw new ResponseError(response.status, json)
  }

  return json
}

export type MutationMethod = 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type MutationArgs = {
  method: MutationMethod
  url: string
  body: unknown
  headers?: Record<string, string>
}

export const mutation = async ({
  body,
  method,
  url,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers = { 'Content-Type': 'application/json' },
}: MutationArgs) => {
  await delay(1000 + 1000 * Math.random())

  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  })
  const json = await response.json()

  if (!response.ok) {
    throw new ResponseError(response.status, json)
  }

  return json
}

export const post = async (url: string, body: unknown) => {
  return mutation({ body, method: 'POST', url })
}

export const put = async (url: string, body: unknown) => {
  return mutation({ body, method: 'PUT', url })
}

export const del = async (url: string, body: unknown) => {
  return mutation({ body, method: 'DELETE', url })
}

export const patch = async (url: string, body: unknown) => {
  return mutation({ body, method: 'PATCH', url })
}
