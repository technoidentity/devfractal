import { cast } from '@srtp/core'
import type {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'
import {
  useQueryClient,
  useMutation as useRQMutation,
} from '@tanstack/react-query'
import { produce, type Draft } from 'immer'
import React from 'react'
import type { z } from 'zod'

export type UseOptimisticMutationOptions<
  TData,
  TVariables,
  TQueryData = TData[],
> = Omit<
  UseMutationOptions<TData, Error, TVariables, { previous: TQueryData }>,
  'mutationFn'
> & {
  invalidateQuery?: QueryKey
  setData?: (old: Draft<TQueryData>, newValue: TVariables) => void
}

function useOptFns<TVariables, TQueryData>(
  invalidateQuery?: QueryKey,
  setData?: (old: Draft<TQueryData>, newValue: TVariables) => void,
) {
  const qc = useQueryClient()

  if (!invalidateQuery) {
    return {}
  }

  const onSuccess = async () => {
    await qc.invalidateQueries(invalidateQuery)
  }

  if (!setData) {
    return { onSuccess }
  }

  const onMutate = async (
    values: TVariables,
  ): Promise<{ previous: TQueryData } | undefined> => {
    await qc.cancelQueries(invalidateQuery)

    const previous: TQueryData | undefined = qc.getQueryData(invalidateQuery)

    qc.setQueryData(invalidateQuery, (old?: TQueryData) =>
      produce(old, (draft: any) => setData(draft, values)),
    )

    return previous ? { previous } : undefined
  }

  const onError = (
    _err: Error,
    _: any,
    context: { previous: TQueryData } | undefined,
  ) => {
    qc.setQueryData(invalidateQuery, context?.previous)
  }

  return { onMutate, onSuccess, onError }
}

export function safeMutation<Spec extends z.ZodTypeAny>(spec: Spec) {
  return function useSafeMutation<TVariables, TQueryData>(
    mutationFn: MutationFunction<z.infer<Spec>, TVariables>,
    options?: UseOptimisticMutationOptions<
      z.infer<Spec>,
      TVariables,
      TQueryData
    >,
  ) {
    const fns = useOptFns<TVariables, TQueryData>(
      options?.invalidateQuery,
      options?.setData,
    )

    const { data, ...rest } = useRQMutation<
      z.infer<Spec>,
      Error,
      TVariables,
      { previous: TQueryData }
    >({
      mutationFn,
      ...fns,
      ...options,
    })

    const typedData = React.useMemo(
      () => (data ? cast(spec, data) : undefined),
      [data],
    )

    return { data: typedData, ...rest } as const
  }
}

export function useSafeMutation<
  Spec extends z.ZodTypeAny,
  TVariables,
  TQueryData,
>(
  spec: Spec,
  mutationFn: MutationFunction<z.infer<Spec>, TVariables>,
  options?: UseOptimisticMutationOptions<z.infer<Spec>, TVariables, TQueryData>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => safeMutation(spec), [])
  return useHook(mutationFn, options)
}
