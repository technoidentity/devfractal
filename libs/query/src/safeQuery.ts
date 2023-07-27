import { useEvent } from '@srtp/react'
import { cast } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'
import React from 'react'
import type { z } from 'zod'
import type { Paths } from './review/queryFn'

// @TODO: Make sure only Error is thrown, else convert it to Error

type Query = Record<
  string | number,
  string | number | boolean | null | undefined
>

export type UseSafeQueryArgs<Spec extends z.ZodTypeAny, TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, Error, z.infer<Spec>>,
  'queryKey'
> &
  Readonly<{
    paths: Paths
    spec: Spec
    query?: Query
  }>

// Currently Spec checks value returned by select;
// not what's fetched from the server, for performance reasons.
export function useQueryBase<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  spec: Spec,
  options: UseQueryOptions<TQueryFnData, Error, z.infer<Spec>, TQueryKey>,
) {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const result = useQuery<TQueryFnData, Error, z.infer<Spec>, TQueryKey>(
    options,
  )

  const data = React.useMemo(() => cast(spec, result.data), [result.data, spec])
  return [data, result] as const
}

export function useSafeQuery<Spec extends z.ZodTypeAny, TQueryFnData>({
  spec,
  paths,
  query,
  ...options
}: UseSafeQueryArgs<Spec, TQueryFnData>) {
  const opts = React.useMemo(() => {
    const enabled = (paths.every(p => !!p) && options?.enabled) || true
    return { ...options, enabled }
  }, [options, paths])

  const queryKey = query ? [...paths, query] : paths

  const result = useQueryBase<Spec, TQueryFnData>(spec, { queryKey, ...opts })
  return [...result, queryKey] as const
}

export function useSafeMutation<
  Spec extends z.ZodTypeAny,
  TVariables = void,
  TContext = unknown,
>(
  spec: Spec,
  options: UseMutationOptions<z.infer<Spec>, Error, TVariables, TContext>,
): UseMutationResult<z.infer<Spec>, Error, TVariables, TContext> {
  // Currently useMutatation doesn't track result unlike useQuery.
  // So the following destructuring is safe.
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const { data, ...result } = useMutation(options)

  // Need to make sure that the data returned by mutation is of type Spec
  const typedData: typeof data = React.useMemo(
    () => (data ? cast(spec, data) : undefined),
    [data, spec],
  )

  return { data: typedData, ...result }
}

export const useInvalidate = (key: QueryKey) => {
  const qc = useQueryClient()

  return useEvent(() => qc.invalidateQueries(key).catch(console.error))
}
