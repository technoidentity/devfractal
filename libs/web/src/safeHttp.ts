import { cast } from '@srtp/core'
import type { z } from 'zod'

import { fetch$ } from './fetch$'
import { createHttp$, type ApiOptions } from './http$'

export function createSafeHttp(fetcher = fetch$) {
  const api = createHttp$(fetcher)
  return {
    get:
      <Spec extends z.ZodTypeAny>(spec: Spec) =>
      async (
        url: string,
        query?: Record<string, string>,
        options?: ApiOptions,
      ): Promise<readonly [z.infer<Spec>, Response]> => {
        const [data, response] = await api.get(url, query, options)
        return [cast(spec, data), response] as const
      },
    post:
      <Spec extends z.ZodTypeAny>(spec: Spec) =>
      async (
        url: string,
        body: unknown,
        options?: ApiOptions,
      ): Promise<readonly [z.infer<Spec>, Response]> => {
        const [data, response] = await api.post(url, body, options)
        return [cast(spec, data), response] as const
      },

    put:
      <Spec extends z.ZodTypeAny>(spec: Spec) =>
      async (
        url: string,
        body: unknown,
        options?: ApiOptions,
      ): Promise<readonly [z.infer<Spec>, Response]> => {
        const [data, response] = await api.put(url, body, options)
        return [cast(spec, data), response] as const
      },

    patch:
      <Spec extends z.ZodTypeAny>(spec: Spec) =>
      async (
        url: string,
        body: unknown,
        options?: ApiOptions,
      ): Promise<readonly [z.infer<Spec>, Response]> => {
        const [data, response] = await api.patch(url, body, options)
        return [cast(spec, data), response] as const
      },

    del:
      <Spec extends z.ZodTypeAny>(spec: Spec) =>
      async (url: string, options?: ApiOptions): Promise<z.infer<Spec>> => {
        const [data, response] = await api.delete(url, options)
        return [cast(spec, data), response] as const
      },
  }
}

export const safeHttp = createSafeHttp()
