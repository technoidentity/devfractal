import type z from 'zod'

import {
  fetch$,
  type AxiosOptions,
  type BaseFetchOptions,
  type FetchResult,
} from './axios'

export class SafeFetchError extends Error {
  constructor(message: string, cause: z.ZodError) {
    super(message, { cause })
  }
}

export async function safeAxios<Spec extends z.ZodTypeAny>(
  spec: Spec,
  options: AxiosOptions,
): FetchResult<z.infer<Spec>> {
  const { data, response } = await fetch$(options.url, options)
  const result = spec.safeParse(data)

  if (result.success) {
    return { data: result.data, response }
  }

  throw new SafeFetchError(
    `Invalid response data: ${result.error.message}`,
    result.error,
  )
}

export async function safeFetch<Spec extends z.ZodTypeAny>(
  spec: Spec,
  url: string,
  options?: BaseFetchOptions,
): FetchResult<z.infer<Spec>> {
  const { data, response } = await fetch$(url, options)
  const result = spec.safeParse(data)

  if (result.success) {
    return { data: result.data, response }
  }

  throw new SafeFetchError(
    `Invalid response data: ${result.error.message}`,
    result.error,
  )
}
