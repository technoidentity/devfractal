import { cast } from '@srtp/spec'
import type { Options as RedaxiosOptions } from 'redaxios'
import axios from 'redaxios'
import type { z } from 'zod'

export type SafeHttpOptions<Spec extends z.ZodTypeAny> = RedaxiosOptions & {
  readonly spec: Spec
  axios?: ReturnType<typeof axios.create>
}

const defaultAxios = axios.create()

export const safeHttp = async <Spec extends z.ZodTypeAny>(
  config: SafeHttpOptions<Spec>,
) => {
  const apiCall = config.axios ?? defaultAxios
  cast(config.spec, (await apiCall(config)).data)
}

export const get =
  <Spec extends z.ZodTypeAny>(config: SafeHttpOptions<Spec>) =>
  async (url: string): Promise<z.infer<Spec>> =>
    safeHttp({ ...config, url, method: 'get' })

export const post =
  <Spec extends z.ZodTypeAny>(config: SafeHttpOptions<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> =>
    safeHttp({ ...config, url, method: 'post', data: body })

export const put =
  <Spec extends z.ZodTypeAny>(config: SafeHttpOptions<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> =>
    safeHttp({ ...config, url, method: 'put', data: body })

export const patch =
  <Spec extends z.ZodTypeAny>(config: SafeHttpOptions<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> =>
    safeHttp({ ...config, url, method: 'patch', data: body })

export const del =
  <Spec extends z.ZodTypeAny>(config: SafeHttpOptions<Spec>) =>
  async (url: string): Promise<z.infer<Spec>> =>
    safeHttp({ ...config, url, method: 'delete' })
