import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import type { Paths } from './queryFn'

// function safeQueryFn<
//   Spec extends z.ZodTypeAny,
//   T = z.infer<Spec>,
//   TQueryKey extends QueryKey = QueryKey,
// >(spec: Spec, queryFn: QueryFunction<T, TQueryKey>) {
//   return async (args: QueryFunctionContext<TQueryKey>) => {
//     try {
//       return spec.parse(await Promise.resolve(queryFn(args)))
//     } catch (err) {
//       console.error(err)
//       throw err
//     }
//   }
// }

type Query = Record<
  string | number,
  string | number | boolean | null | undefined
>

export type UseSafeQueryArgs<Spec extends z.ZodTypeAny> = Omit<
  UseQueryOptions,
  'queryKey'
> &
  Readonly<{
    paths: Paths
    spec: Spec
    query?: Query
  }>

export function useSafeQuery<Spec extends z.ZodTypeAny>({
  spec,
  paths,
  query,
  ...options
}: UseSafeQueryArgs<Spec>) {
  const qc = useQueryClient()
  const fn = options?.queryFn ?? qc.getDefaultOptions().queries?.queryFn

  invariant(fn, 'queryFn is required')

  const opts = React.useMemo(() => {
    const enabled = (paths.every(p => !!p) && options?.enabled) || true
    return { ...options, enabled }
  }, [options, paths])

  const queryKey = query ? [...paths, query] : paths
  const result = useQuery<z.infer<Spec>>({ queryKey, queryFn: fn, ...opts })

  const data: z.infer<Spec> = React.useMemo(
    () => spec.parse(result.data),
    [result.data, spec],
  )

  return { ...result, data }
}

// export function useSafeMutation<Spec extends z.ZodTypeAny>() {}
