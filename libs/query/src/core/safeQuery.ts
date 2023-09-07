import { cast } from '@srtp/core'
import { enumerate, map, pipe } from '@srtp/fn'
import {
  useQueries,
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import React from 'react'
import type { z } from 'zod'

import type { Paths } from './queryFn'

// @TODO: Make sure only Error is thrown, else convert it to Error

export function useQueryBase<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  spec: Spec,
  options: UseQueryOptions<TQueryFnData, Error, z.infer<Spec>, TQueryKey>,
): readonly [z.infer<Spec>, UseQueryResult<TQueryFnData, Error>] {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const result = useQuery(options)

  const data = React.useMemo(() => cast(spec, result.data), [result.data, spec])
  return [data, result] as const
}

type Query = Record<
  string | number,
  string | number | boolean | null | undefined
>

export type UseSafeQueryArgs<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
> = Readonly<{ paths: Paths; spec: Spec; query?: Query }> &
  Omit<
    UseQueryOptions<TQueryFnData, Error, z.infer<Spec>>,
    'queryKey' | 'select'
  >

export type UseSafeQueryResult<Spec extends z.ZodTypeAny> = readonly [
  data: z.infer<Spec>,
  invalidateKey: QueryKey,
  result: UseQueryResult<z.infer<Spec>, Error>,
]

export function useSafeQuery<Spec extends z.ZodTypeAny, TQueryFnData>({
  spec,
  paths,
  query,
  ...options
}: UseSafeQueryArgs<Spec, TQueryFnData>): UseSafeQueryResult<Spec> {
  const opts = React.useMemo(() => {
    const enabled = paths.every(p => !!p) || options?.enabled
    return { ...options, enabled }
  }, [options, paths])

  const queryKey = query ? [...paths, query] : paths

  const [data, result] = useQueryBase<Spec, TQueryFnData>(spec, {
    queryKey,
    ...opts,
  })

  return [data, queryKey, result] as const
}

type UseQueriesOptions<
  Spec extends z.ZodTypeAny,
  TQueryFnData = unknown,
> = Record<
  string,
  Omit<UseQueryOptions<TQueryFnData, Error, z.infer<Spec>>, 'context'> & {
    spec: Spec
  }
>

export type QueriesResults<Queries extends UseQueriesOptions<any>> =
  Queries extends UseQueriesOptions<infer Spec>
    ? UseQueryResult<z.infer<Spec>, Error>[]
    : never // or UseQueryResult[] ?

type DataList<Queries extends UseQueriesOptions<any>> = {
  [K in keyof Queries]: z.infer<Queries[K]['spec']>
}
export type UseSafeQueriesResult<Queries extends UseQueriesOptions<any>> =
  readonly [dataList: DataList<Queries>, results: QueriesResults<Queries>]

export function useSafeQueries<Queries extends UseQueriesOptions<any>>(
  queries: Queries,
  context?: UseQueryOptions['context'],
): readonly [DataList<Queries>, UseSafeQueriesResult<Queries>] {
  const results = useQueries({ queries: Object.values(queries), context })

  const dataList = React.useMemo(
    () =>
      pipe(
        results,
        Object.entries,
        map(([k, result]) => cast(queries[k].spec, result.data)),
        Object.fromEntries,
      ),
    [queries, results],
  )

  const resultsObj = React.useMemo(
    () =>
      pipe(
        queries,
        Object.keys,
        enumerate,
        map(([k, i]) => [k, results[i]] as const),
        Object.fromEntries,
      ),
    [queries, results],
  )

  return [dataList, resultsObj] as const
}

export function useManyQuery<Spec extends z.ZodTypeAny, TQueryFnData>(
  spec: Spec,
  queryKeys: QueryKey[],
  options: Omit<
    UseQueryOptions<TQueryFnData, Error, z.infer<Spec>>,
    'queryKey' | 'context'
  >,
  context: UseQueryOptions['context'],
): readonly [
  readonly z.infer<Spec>[],
  readonly UseQueryResult<z.infer<Spec>, Error>[],
] {
  const queries = queryKeys.map(queryKey => ({ ...options, queryKey }))
  const results = useQueries({ queries, context })

  const data = React.useMemo(
    () => results.map(result => cast(spec, result.data)),
    [results, spec],
  )

  return [data, results] as const
}
