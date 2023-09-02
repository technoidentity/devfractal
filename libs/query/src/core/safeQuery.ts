import { cast } from '@srtp/core'
import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import React from 'react'
import type { z } from 'zod'

import type { Paths } from './queryFn'

// @TODO: Make sure only Error is thrown, else convert it to Error

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

export function useQueryBase<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  spec: Spec,
  options: UseQueryOptions<TQueryFnData, Error, z.infer<Spec>, TQueryKey>,
): readonly [z.infer<Spec>, UseQueryResult<TQueryFnData, Error>] {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const result = useQuery<TQueryFnData, Error, z.infer<Spec>, TQueryKey>(
    options,
  )

  const data = React.useMemo(() => cast(spec, result.data), [result.data, spec])
  return [data, result] as const
}

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
    const enabled = (paths.every(p => !!p) && options?.enabled) || true
    return { ...options, enabled }
  }, [options, paths])

  const queryKey = query ? [...paths, query] : paths

  const [data, result] = useQueryBase<Spec, TQueryFnData>(spec, {
    queryKey,
    ...opts,
  })
  return [data, queryKey, result] as const
}
