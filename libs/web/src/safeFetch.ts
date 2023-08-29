import type z from 'zod'

import { fetch$, type AxiosOptions } from './fetch$'

export class SafeFetchError extends Error {
  constructor(message: string, cause: z.ZodError) {
    super(message, { cause })
  }
}

export async function safeAxios<Spec extends z.ZodTypeAny>(
  options: AxiosOptions,
  spec: Spec,
): Promise<readonly [z.infer<Spec>, Response]> {
  const [data, response] = await fetch$(options.url, options)
  const result = spec.safeParse(data)
  if (result.success) {
    return [result.data, response] as const
  }
  throw new SafeFetchError(
    `Invalid response data: ${result.error.message}`,
    result.error,
  )
}

export async function safeFetch<Spec extends z.ZodTypeAny>(
  url: string,
  spec: Spec,
): Promise<readonly [z.infer<Spec>, Response]> {
  const [data, response] = await fetch$(url)
  const result = spec.safeParse(data)
  if (result.success) {
    return [result.data, response] as const
  }
  throw new SafeFetchError(
    `Invalid response data: ${result.error.message}`,
    result.error,
  )
}
