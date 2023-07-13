import type {
  MutationFunction,
  UseMutationOptions,
} from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { produce, type Draft } from 'immer'

import React from 'react'
import redaxios from 'redaxios'
import invariant from 'tiny-invariant'
import type { MutationDescription } from './mutationApi'
import { mutationApi } from './mutationApi'

export async function mutation<T>(mut: MutationDescription<T>) {
  const res = await redaxios[mut.type](mut.path, mut.payload)
  return res.data
}

export type MutationAction<TData, TVariables, TQueryData> = (
  old: Draft<TQueryData>,
  api: typeof mutationApi,
  arg: TVariables,
) => MutationDescription<TData>

export function useDescribeMutation<TData, TVariables, TQueryData>(
  invalidateQuery: any[],
  fn: MutationAction<TData, TVariables, TQueryData>,
) {
  const result = React.useRef<MutationDescription<TData>>()

  const setData = (old: any, values: any): any =>
    produce(old, (draft: any) => {
      result.current = fn(draft, mutationApi, values)
    })

  const mutationFn = () => {
    invariant(result.current, 'mutation description is undefined')
    return mutation(result.current)
  }

  return useOptimisticValue<TData, TVariables, TQueryData>(
    invalidateQuery,
    mutationFn,
    setData,
  )
}

export type MutationOptions<TData, TVariables, TQueryData = TData[]> = Omit<
  UseMutationOptions<TData, Error, TVariables, { previous: TQueryData }>,
  'mutationFn'
>

export function useOptimisticValue<TData, TVariables, TQueryData>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  setData: (old: TQueryData, newValue: TVariables) => TQueryData,
  options?: MutationOptions<TData, TVariables, TQueryData>,
) {
  const qc = useQueryClient()

  const onMutate = async (
    values: TVariables,
  ): Promise<{ previous: TQueryData } | undefined> => {
    await qc.cancelQueries(invalidateQuery)

    const previous: TQueryData | undefined = qc.getQueryData(invalidateQuery)

    qc.setQueryData(invalidateQuery, (old: any) => setData(old, values as any))

    return previous ? { previous } : undefined
  }

  const onSettled = async () => {
    await qc.invalidateQueries(invalidateQuery)
  }

  const error = (
    _err: Error,
    context: { previous: TQueryData } | undefined,
  ) => {
    qc.setQueryData(invalidateQuery, context?.previous)
  }

  const mutation = useMutation({
    mutationFn,
    onMutate,
    onError: (err, _, context) => error(err, context),
    onSuccess: onSettled,
    ...options,
  } satisfies UseMutationOptions<
    TData,
    Error,
    TVariables,
    { previous: TQueryData }
  >)

  return [mutation.mutate, mutation] as const
}

export function useOptimistic<TData, TVariables, TQueryData>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  setData: (old: Draft<TQueryData>, newValue: TVariables) => void,
  options?: MutationOptions<TData, TVariables, TQueryData>,
) {
  return useOptimisticValue<TData, TVariables, TQueryData>(
    invalidateQuery,
    mutationFn,
    (old, newValue) => produce(old, draft => setData(draft, newValue)),
    options,
  )
}
