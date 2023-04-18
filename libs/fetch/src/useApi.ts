import type { Paths } from './httpMethods'

import { logError } from '@srtp/core'
import type { QueryClient } from '@tanstack/react-query'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { produce } from 'immer'
import React from 'react'
import type { z } from 'zod'
import { safeQueryFn } from './httpMethods'

type UseSafeQueryArgs<Spec extends z.ZodTypeAny> = Readonly<{
  key: Paths
  query?: Record<string | number, string | number | boolean | null | undefined>
  spec: Spec
  // @TODO: better typing
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
}>

export function useSafeQuery<Spec extends z.ZodTypeAny>({
  spec,
  key: paths,
  query,
  options,
}: UseSafeQueryArgs<Spec>) {
  const fn = safeQueryFn(spec)

  const enabled = paths.every(p => !!p) && options?.enabled
  const opts = { ...options, enabled }
  const queryKey = [...paths, query]

  const result = useQuery<z.infer<Spec>>(queryKey, fn, opts)

  logError(result.error)

  return { ...result, queryKey }
}

export function onMutate<T extends { id: any }>(
  listPaths: Paths,
  queryClient: QueryClient,
) {
  return async (card: T) => {
    await queryClient.cancelQueries(listPaths)

    const oldList = queryClient.getQueryData(listPaths)

    queryClient.setQueryData(
      listPaths,
      produce((draft: any) => {
        const idx = draft.findIndex((c: T) => c.id === card.id)
        if (idx === -1) {
          console.warn('idx is -1')
          return
        }
        draft[idx] = card
      }),
    )

    return { oldList }
  }
}

export function useOptMutation<T extends { id: any }>(
  listPaths: any, // @TODO: handle query too!
  update: (card: T) => Promise<T>,
) {
  const queryClient = useQueryClient()

  const { mutate } = useMutation(update, {
    onSettled: React.useCallback(
      () => queryClient.invalidateQueries(listPaths, { exact: true }),
      [queryClient, listPaths],
    ),
    onMutate: React.useMemo(
      () => onMutate(listPaths, queryClient),
      [queryClient, listPaths],
    ),
    onError: (_err, _new, ctx) => {
      // @TODO: notify
      if (ctx !== undefined) {
        queryClient.setQueryData(listPaths, ctx.oldList)
      }
    },
  })

  return mutate
}
