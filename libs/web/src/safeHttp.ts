import { cast } from '@srtp/spec'

import type { z } from 'zod'
import { createBaseApi, type ApiOptions } from './baseApi'
import { baseFetch } from './baseFetch'

export function createSafeApi(fetcher = baseFetch) {
  const api = createBaseApi(fetcher)
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