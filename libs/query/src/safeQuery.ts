import { cast, ensure } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
  type UseMutationResult,
} from '@tanstack/react-query'
import React from 'react'
import type { z } from 'zod'
import type { Paths } from './queryFn'
import { useErrorBoundary } from 'react-error-boundary'

type Query = Record<
  string | number,
  string | number | boolean | null | undefined
>

export type UseSafeQueryArgs<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
  TError = unknown,
> = Omit<UseQueryOptions<TQueryFnData, TError, z.infer<Spec>>, 'queryKey'> &
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
  TError = unknown,
  TQueryKey extends QueryKey = QueryKey,
>(
  spec: Spec,
  options: UseQueryOptions<TQueryFnData, TError, z.infer<Spec>, TQueryKey>,
) {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const result = useQuery<TQueryFnData, TError, z.infer<Spec>, TQueryKey>(
    options,
  )

  const data = React.useMemo(() => cast(spec, result.data), [result.data, spec])
  return [data, result] as const
}

export function useSafeQuery<
  Spec extends z.ZodTypeAny,
  TQueryFnData,
  TError = unknown,
>({
  spec,
  paths,
  query,
  ...options
}: UseSafeQueryArgs<Spec, TQueryFnData, TError>) {
  const opts = React.useMemo(() => {
    const enabled = (paths.every(p => !!p) && options?.enabled) || true
    return { ...options, enabled }
  }, [options, paths])

  const queryKey = query ? [...paths, query] : paths
  return useQueryBase<Spec, TQueryFnData, TError>(spec, { queryKey, ...opts })
}

export function useSafeMutation<
  Spec extends z.ZodTypeAny,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  spec: Spec,
  options: UseMutationOptions<z.infer<Spec>, TError, TVariables, TContext>,
): UseMutationResult<z.infer<Spec>, TError, TVariables, TContext> {
  // eslint-disable-next-line @tanstack/query/prefer-query-object-syntax
  const result = useMutation(options)
  const { showBoundary } = useErrorBoundary()

  React.useEffect(() => {
    if (result.data) {
      try {
        ensure(spec, result.data)
      } catch (error) {
        showBoundary(error)
      }
    }
  }, [result.data, showBoundary, spec])

  return result
}
