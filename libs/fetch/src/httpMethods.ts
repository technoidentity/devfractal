import { cast } from '@srtp/spec'
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query'
import qs from 'query-string'

import type { Options as RedaxiosOptions } from 'redaxios'
import axios from 'redaxios'
import { z } from 'zod'

const { stringify } = qs

export type Options<Spec extends z.ZodTypeAny> = RedaxiosOptions & {
  readonly response: Spec
}

export const get =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (url: string): Promise<z.infer<Spec>> => {
    const resp = (await axios.get(url, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const post =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> => {
    const resp = (await axios.post(url, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const put =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> => {
    const resp = (await axios.put(url, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const patch =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (url: string, body: unknown): Promise<z.infer<Spec>> => {
    const resp = (await axios.patch(url, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const del =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  (url: string): Promise<z.infer<Spec>> => {
    const resp = axios.delete(url, config)
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const Paths = z.array(z.string().or(z.number()).nullish())
export type Paths = Readonly<z.infer<typeof Paths>>

export const pathsToUrl = (
  paths: Paths,
  query?: Record<string, any>,
  options?: qs.StringifyOptions,
): string => {
  const qs = stringify(query || {}, options)
  const q = qs.length > 0 ? `?${qs}` : ''
  return `/api/${paths.join('/')}${q}`
}

export async function queryFn<
  T,
  TQueryKey extends QueryKey = QueryKey | [...Paths, Record<string, any>],
>({ queryKey }: QueryFunctionContext<TQueryKey>): Promise<T> {
  const last = queryKey.at(-1)
  const qs = last ? cast(z.record(z.string(), z.any()), queryKey.at(-1)) : {}

  const rest = last ? queryKey.slice(0, -1) : queryKey
  const paths = cast(Paths, rest)

  return get$(pathsToUrl(paths, qs))
}

export function safeQueryFn<
  TQueryKey extends QueryKey,
  Spec extends z.ZodTypeAny,
>(
  spec: Spec,
): (context: QueryFunctionContext<TQueryKey>) => Promise<z.infer<Spec>> {
  return async context => spec.parse(await queryFn(context))
}

export const put$ = put()
export const post$ = post()
export const get$ = get()
export const patch$ = patch()
export const del$ = del()
