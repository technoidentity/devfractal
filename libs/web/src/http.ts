import { cast } from '@srtp/core'
import type { z } from 'zod'

import {
  axios,
  createAxios,
  type BaseFetchOptions,
  type BaseUrlOrAxios,
  type FetchResult,
} from './axios'
import { urlcat } from './url'

export type ApiOptions = Omit<BaseFetchOptions, 'body'>

export function createHttp(baseUrlOrAxios: BaseUrlOrAxios = axios) {
  const fetcher = createAxios(baseUrlOrAxios)

  return {
    async get$(
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) {
      return fetcher({ url: urlcat(url, '', query), ...options, method: 'GET' })
    },

    async post$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher({ url, ...options, body, method: 'POST' })
    },

    async put$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher({ url, ...options, body, method: 'PUT' })
    },

    async patch$(url: string, body: unknown, options?: ApiOptions) {
      return fetcher({ url, ...options, body, method: 'PATCH' })
    },

    async del$(url: string, options?: ApiOptions) {
      return fetcher({ url, ...options, method: 'DELETE' })
    },

    async get<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ): FetchResult<z.infer<Spec>> {
      const { data, response } = await this.get$(url, query, options)
      return { data: cast(spec, data), response }
    },

    async post<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): FetchResult<z.infer<Spec>> {
      const { data, response } = await this.post$(url, body, options)
      return { data: cast(spec, data), response }
    },

    async put<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): FetchResult<z.infer<Spec>> {
      const { data, response } = await this.put$(url, body, options)
      return { data: cast(spec, data), response }
    },

    async patch<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ): FetchResult<z.infer<Spec>> {
      const { data, response } = await this.patch$(url, body, options)
      return { data: cast(spec, data), response }
    },

    async del<Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      options?: ApiOptions,
    ): FetchResult<z.infer<Spec>> {
      const { data, response } = await this.del$(url, options)
      return { data: cast(spec, data), response }
    },
  }
}

export const http = createHttp()
