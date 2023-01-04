import { Paths, safeQueryFn } from '@core/api'
import { logIfError } from '@core/utils'
import produce from 'immer'
import React from 'react'
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from 'react-query'
import { z, ZodTypeAny } from 'zod'

type UseSafeQueryArgs<Spec extends ZodTypeAny> = Readonly<{
  key: Paths
  query?: Record<string | number, string | number | boolean | null | undefined>
  spec: Spec
  // @TODO: better typing
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
}>

export function useSafeQuery<Spec extends ZodTypeAny>({
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

  logIfError(result.error)

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
      produce(draft => {
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
      ctx && queryClient.setQueryData(listPaths, ctx.oldList)
    },
  })

  return mutate
}
