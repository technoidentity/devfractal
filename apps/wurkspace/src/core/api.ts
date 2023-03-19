import { cast } from '@srtp/spec'
import qs from 'query-string'
import type { QueryFunctionContext, QueryKey } from 'react-query'
import type { Options as RedaxiosOptions } from 'redaxios'
import axios from 'redaxios'
import { z } from 'zod'

const { stringify } = qs

export type Options<Spec extends z.ZodTypeAny> = RedaxiosOptions & {
  readonly response: Spec
}

export const sget =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string): Promise<z.infer<Spec>> => {
    const resp = (await axios.get(key, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const get = sget()

export const spost =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.post(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const post = spost()

export const sput =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.put(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const put = sput()

export const spatch =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.patch(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const patch = spatch()

export const sdel =
  <Spec extends z.ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string) => {
    const resp = axios.delete(key, config)
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const del = sdel()

export const Paths = z.array(z.string().or(z.number()).nullish())
export type Paths = Readonly<z.infer<typeof Paths>>

export const pathsToUrl = (paths: Paths, query?: Record<string, any>) => {
  const qs = stringify(query || {})
  const q = qs.length > 0 ? `?${qs}` : ''
  return `/api/${paths.join('/')}${q}`
}

export async function queryFn<T, TQueryKey extends QueryKey = QueryKey>({
  queryKey,
}: QueryFunctionContext<TQueryKey>): Promise<T> {
  const query =
    cast(
      z.record(z.string(), z.any()).nullish(),
      queryKey[queryKey.length - 1],
    ) ?? {}

  const paths = cast(Paths, queryKey.slice(0, queryKey.length - 1))

  const path = pathsToUrl(paths, query)
  return get(path)
}

export function safeQueryFn<
  TQueryKey extends QueryKey,
  Spec extends z.ZodTypeAny,
>(spec: Spec) {
  return async (
    context: QueryFunctionContext<TQueryKey>,
  ): Promise<z.infer<Spec>> => spec.parse(await queryFn(context))
}
