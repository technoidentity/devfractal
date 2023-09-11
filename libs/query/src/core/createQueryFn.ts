import { cast } from '@srtp/core'
import { axios, joinPaths, urlcat, type AxiosFn } from '@srtp/web'
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query'
import { z } from 'zod'

export const Paths = z.array(z.string().or(z.number()).nullish())
export type Paths = Readonly<z.infer<typeof Paths>>

export function createToUrl(basePath: string) {
  return (paths: Paths, query?: Record<string, any>): string =>
    urlcat(basePath, joinPaths((paths ?? []) as string[]), query)
}

export type ToUrl = ReturnType<typeof createToUrl>

/**
 * default queryFn for react-query
 * @param basePathOrToUrl - Either a base path or a function that takes paths and query and returns a url
 * @param axiosFn - An axios function to use for the request
 * @returns - A query function that can be used with react-query
 */
export const createQueryFn =
  (basePathOrToUrl: ToUrl | string, axiosFn: AxiosFn = axios) =>
  <TQueryKey extends QueryKey = QueryKey | [...Paths, Record<string, any>]>({
    queryKey,
  }: QueryFunctionContext<TQueryKey>): Promise<unknown> => {
    const toUrl =
      typeof basePathOrToUrl === 'string'
        ? createToUrl(basePathOrToUrl)
        : basePathOrToUrl

    const last = queryKey.at(-1)

    let qs: object | undefined
    if (last) {
      const res = z.record(z.string(), z.any()).safeParse(last)
      qs = res.success ? res.data : undefined
    }

    const rest = qs ? queryKey.slice(0, -1) : queryKey
    const paths = cast(Paths, rest)

    return axiosFn({ url: toUrl(paths, qs), method: 'GET' })
  }

/**
 *
 * Should be used only with raw useQuery
 * @param basePathOrToUrl - Either a base path or a function that takes paths and query and returns a url *
 * @param spec - A zod schema for the response
 * @returns A query function that can be used with react-query
 */
export const safeQueryFn = function safeQueryFn<
  TQueryKey extends QueryKey,
  Spec extends z.ZodTypeAny,
>(
  basePathOrToUrl: ToUrl | string,
  spec: Spec,
): (context: QueryFunctionContext<TQueryKey>) => Promise<z.infer<Spec>> {
  const toUrl =
    typeof basePathOrToUrl === 'string'
      ? createToUrl(basePathOrToUrl)
      : basePathOrToUrl

  return async context => cast(spec, await createQueryFn(toUrl)(context))
}
