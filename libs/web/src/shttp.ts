import type { z } from 'zod'

import { axios, type BaseUrlOrAxios } from './axios'
import { createHttp, type ApiOptions } from './http'

export function createSHttp(baseUrlOrAxios: BaseUrlOrAxios = axios) {
  const base = createHttp(baseUrlOrAxios)

  return {
    get$: async (
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => (await base.get$(url, query, options)).data,

    post$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.post$(url, body, options)).data,

    put$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.put$(url, body, options)).data,

    patch$: async (url: string, body: unknown, options?: ApiOptions) =>
      (await base.patch$(url, body, options)).data,

    del$: async (url: string, options?: ApiOptions) =>
      (await base.del$(url, options)).data,

    get: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      query?: Record<string, string>,
      options?: ApiOptions,
    ) => {
      const { data } = await base.get(spec, url, query, options)
      return data
    },

    post: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const { data } = await base.post(spec, url, body, options)
      return data
    },

    put: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const { data } = await base.put(spec, url, body, options)
      return data
    },

    patch: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      body: unknown,
      options?: ApiOptions,
    ) => {
      const { data } = await base.patch(spec, url, body, options)
      return data
    },

    del: async <Spec extends z.ZodTypeAny>(
      spec: Spec,
      url: string,
      options?: ApiOptions,
    ) => {
      const { data } = await base.del(spec, url, options)
      return data
    },
  }
}

export const shttp = createSHttp()
