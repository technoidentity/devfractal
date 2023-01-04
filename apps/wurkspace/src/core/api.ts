import qs from 'query-string'
import { QueryFunctionContext, QueryKey } from 'react-query'
import axios, { Options as RedaxiosOptions } from 'redaxios'
import { any, array, number, record, string, z, ZodTypeAny } from 'zod'
import { cast } from './casts'

const { stringify } = qs

export type Options<Spec extends ZodTypeAny> = RedaxiosOptions & {
  readonly response: Spec
}

export const sget =
  <Spec extends ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string): Promise<z.infer<Spec>> => {
    const resp = (await axios.get(key, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const get = sget()

export const spost =
  <Spec extends ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.post(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const post = spost()

export const sput =
  <Spec extends ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.put(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const put = sput()

export const spatch =
  <Spec extends ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string, body: unknown) => {
    const resp = (await axios.patch(key, body, config)).data
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const patch = spatch()

export const sdel =
  <Spec extends ZodTypeAny>(config?: Options<Spec>) =>
  async (key: string) => {
    const resp = axios.delete(key, config)
    const spec = config?.response

    return spec ? spec.parse(resp) : (resp as z.infer<Spec>)
  }

export const del = sdel()

export const Paths = array(string().or(number()).nullish())
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
    cast(record(string(), any()).nullish(), queryKey[queryKey.length - 1]) ?? {}

  const paths = cast(Paths, queryKey.slice(0, queryKey.length - 1))

  const path = pathsToUrl(paths, query)
  return get(path)
}

export function safeQueryFn<
  TQueryKey extends QueryKey,
  Spec extends ZodTypeAny,
>(spec: Spec) {
  return async (
    context: QueryFunctionContext<TQueryKey>,
  ): Promise<z.infer<Spec>> => spec.parse(await queryFn(context))
}
