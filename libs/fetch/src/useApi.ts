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
import invariant from 'tiny-invariant'
import type { z } from 'zod'
import type { Paths } from './queryFn'

type Query = Record<
  string | number,
  string | number | boolean | null | undefined
>
type UseSafeQueryArgs<Spec extends z.ZodTypeAny> = Readonly<{
  queryKey: [Paths, Query?]
  spec: Spec
  // @TODO: better typing
  options?: Omit<UseQueryOptions, 'queryKey'>
}>

export function useSafeQuery<Spec extends z.ZodTypeAny>({
  spec,
  queryKey,
  options,
}: UseSafeQueryArgs<Spec>) {
  const qc = useQueryClient()
  const fn = options?.queryFn ?? qc.getDefaultOptions().queries?.queryFn

  invariant(fn, 'queryFn is required')

  const opts = React.useMemo(() => {
    const enabled = queryKey.every(p => !!p) && options?.enabled
    return { ...options, enabled }
  }, [options, queryKey])

  const result = useQuery<z.infer<Spec>>(queryKey, fn, opts)

  const data = React.useMemo(() => spec.parse(result.data), [result.data, spec])

  React.useEffect(() => {
    logError(result.error)
  }, [result.error])

  return { ...result, data }
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
