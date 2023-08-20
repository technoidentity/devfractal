import { createHttp$, type ApiOptions } from './http$'
import { fetch$ } from './fetch$'
import type { z } from 'zod'
import { cast } from '@srtp/spec'

export function createHttp(fetcher = fetch$) {
  const base = createHttp$(fetcher)

  return {
    get$: async (
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => (await base.get(url, query, options))[0],

    post$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.post(url, body, options))[0],

    put$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.put(url, body, options))[0],

    patch$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.patch(url, body, options))[0],

    del$: async (url: string, options?: ApiOptions) =>
      (await base.delete(url, options))[0],

    get: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => {
      const [data] = await base.get(url, query, options)
      return cast(spec, data)
    },

    post: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.post(url, body, options)
      return cast(spec, data)
    },

    put: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.put(url, body, options)
      return cast(spec, data)
    },

    patch: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.patch(url, body, options)
      return cast(spec, data)
    },

    del: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      options?: ApiOptions,
    ) => {
      const [data] = await base.delete(url, options)
      return cast(spec, data)
    },
  }
}

export const http = createHttp()
