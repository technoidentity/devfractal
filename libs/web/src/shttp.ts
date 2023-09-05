import type { z } from 'zod'

import { fetch$ } from './fetch$'
import { createHttp, type ApiOptions } from './http'

export function createSHttp(fetcher = fetch$) {
  const base = createHttp(fetcher)

  return {
    get$: async (
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => (await base.get$(url, query, options))[0],

    post$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.post$(url, body, options))[0],

    put$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.put$(url, body, options))[0],

    patch$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.patch$(url, body, options))[0],

    del$: async (url: string, options?: ApiOptions) =>
      (await base.del$(url, options))[0],

    get: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => {
      const [data] = await base.get(spec, url, query, options)
      return data
    },

    post: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.post(spec, url, body, options)
      return data
    },

    put: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.put(spec, url, body, options)
      return data
    },

    patch: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const [data] = await base.patch(spec, url, body, options)
      return data
    },

    del: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      options?: ApiOptions,
    ) => {
      const [data] = await base.del(spec, url, options)
      return data
    },
  }
}

export const shttp = createSHttp()
