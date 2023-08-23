import { cast } from '@srtp/core'
import type { QueryFunctionContext, QueryKey } from '@tanstack/react-query'

// @TODO: should be web?

import { joinPaths, urlcat } from '@srtp/web'
import { z } from 'zod'
import { defaultApi } from '../api'

export const Paths = z.array(z.string().or(z.number()).nullish())
export type Paths = Readonly<z.infer<typeof Paths>>

const toUrl = (
  basePath: string,
  paths: Paths,
  query?: Record<string, any>,
): string => {
  const ps = (paths ?? []) as string[]
  return urlcat(basePath, joinPaths(ps), query)
}

export const createToUrl =
  (basePath: string) =>
  (paths: Paths, query?: Record<string, any>): string =>
    toUrl(basePath, paths, query)

export type ToUrl = ReturnType<typeof createToUrl>

export const queryFn =
  (basePathOrToUrl: ToUrl | string) =>
  <TQueryKey extends QueryKey = QueryKey | [...Paths, Record<string, any>]>({
    queryKey,
  }: QueryFunctionContext<TQueryKey>): Promise<unknown> => {
    const toUrl =
      typeof basePathOrToUrl === 'string'
        ? createToUrl(basePathOrToUrl)
        : basePathOrToUrl

    const last = queryKey.at(-1)
    const qs = last ? cast(z.record(z.string(), z.any()), last) : {}

    const rest = last ? queryKey.slice(0, -1) : queryKey
    const paths = cast(Paths, rest)

    return defaultApi.get$(toUrl(paths, qs))
  }

// Should be used only with raw useQuery
export const safeQueryFn = function safeQueryFn<
  TQueryKey extends QueryKey,
  Spec extends z.ZodTypeAny,
>(
  toUrlOrbasePath: ToUrl | string,
  spec: Spec,
): (context: QueryFunctionContext<TQueryKey>) => Promise<z.infer<Spec>> {
  const toUrl =
    typeof toUrlOrbasePath === 'string'
      ? createToUrl(toUrlOrbasePath)
      : toUrlOrbasePath

  return async context => cast(spec, await queryFn(toUrl)(context))
}
