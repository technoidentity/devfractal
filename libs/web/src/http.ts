import { cast } from '@srtp/core'
import type { z } from 'zod'

import { fetch$, type BaseFetchOptions } from './fetch$'
import { urlcat } from './url'

export type ApiOptions = Omit<BaseFetchOptions, 'body'>

export function createHttp(fetcher = fetch$) {
  return {
    async get$(
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) {
      return fetcher(urlcat(url, '', query), { ...options, method: 'GET' })
    },

    async post$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher(url, { ...options, body, method: 'POST' })
    },

    async put$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher(url, { ...options, body, method: 'PUT' })
    },

    async patch$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher(url, { ...options, body, method: 'PATCH' })
    },

    async del$(url: string, options?: ApiOptions) {
      return fetcher(url, { ...options, method: 'DELETE' })
    },

    async get<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ): Promise<readonly [z.infer<Spec>, Response]> {
      const [data, response] = await this.get$(url, query, options)
      return [cast(spec, data), response] as const
    },

    async post<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): Promise<readonly [z.infer<Spec>, Response]> {
      const [data, response] = await this.post$(url, body, options)
      return [cast(spec, data), response] as const
    },

    async put<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): Promise<readonly [z.infer<Spec>, Response]> {
      const [data, response] = await this.put$(url, body, options)
      return [cast(spec, data), response] as const
    },

    async patch<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): Promise<readonly [z.infer<Spec>, Response]> {
      const [data, response] = await this.patch$(url, body, options)
      return [cast(spec, data), response] as const
    },

    async del<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      options?: ApiOptions,
    ): Promise<readonly [z.infer<Spec>, Response]> {
      const [data, response] = await this.del$(url, options)
      return [cast(spec, data), response] as const
    },
  }
}

export const http = createHttp()
