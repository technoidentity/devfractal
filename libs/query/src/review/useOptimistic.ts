import { axios } from '@srtp/web'
import type {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'
import {
  useMutation as useMutationImmer,
  useQueryClient,
} from '@tanstack/react-query'
import { produce, type Draft } from 'immer'
import React from 'react'
import invariant from 'tiny-invariant'

import type { MutationDescription } from './mutationApi'
import { ApiDescriptions } from './mutationApi'

async function defaultMutation<T>(mut: MutationDescription<T>) {
  const [data] = await axios({
    url: mut.path,
    method: mut.type,
    body: mut.payload,
  })
  return data
}

export type MutationAction<TData, TVariables, TQueryData> = (
  old: Draft<TQueryData>,
  api: typeof ApiDescriptions,
  arg: TVariables,
) => MutationDescription<TData>

export type UseOptimisticMutationOptions<
  TData,
  TVariables,
  TQueryData = TData[],
> = Omit<
  UseMutationOptions<TData, Error, TVariables, { previous: TQueryData }>,
  'mutationFn'
> & { mutation: (mut: MutationDescription<TData>) => Promise<TData> }

export function useDescribeMutation<TData, TVariables, TQueryData>(
  invalidateQuery: QueryKey,
  fn: MutationAction<TData, TVariables, TQueryData>,
  options?: UseOptimisticMutationOptions<TData, TVariables, TQueryData>,
) {
  const result = React.useRef<MutationDescription<TData>>()

  const setData = (old: any, values: any): any =>
    produce(old, (draft: any) => {
      result.current = fn(draft, ApiDescriptions, values)
    })

  const mutation = options?.mutation ?? defaultMutation

  const mutationFn = () => {
    invariant(result.current, 'mutation description is undefined')
    return mutation(result.current) as any
  }

  return useOptimisticValue<TData, TVariables, TQueryData>(
    invalidateQuery,
    mutationFn,
    setData,
    options,
  )
}

export function useOptimisticValue<TData, TVariables, TQueryData>(
  invalidateQuery: QueryKey,
  mutationFn: MutationFunction<TData, TVariables>,
  setData: (old: TQueryData, newValue: TVariables) => TQueryData,
  options?: UseOptimisticMutationOptions<TData, TVariables, TQueryData>,
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

  const mutation = useMutationImmer({
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
  invalidateQuery: QueryKey,
  mutationFn: MutationFunction<TData, TVariables>,
  setData: (old: Draft<TQueryData>, newValue: TVariables) => void,
  options?: UseOptimisticMutationOptions<TData, TVariables, TQueryData>,
) {
  return useOptimisticValue<TData, TVariables, TQueryData>(
    invalidateQuery,
    mutationFn,
    (old, newValue) => produce(old, draft => setData(draft, newValue)),
    options,
  )
}
