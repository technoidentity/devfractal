import { cast } from '@srtp/core'
import type {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import {
  useQueryClient,
  useMutation as useRQMutation,
} from '@tanstack/react-query'
import { produce, type Draft } from 'immer'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

type Context<TQueryData> = { previous: TQueryData } | undefined

export type UseOptimisticMutationOptions<
  TData,
  TVariables,
  TQueryData = TData[],
  TContext = Context<TQueryData>,
> = Omit<
  UseMutationOptions<TData, Error, TVariables, TContext>,
  'mutationFn'
> & {
  invalidateKey?: QueryKey
  setData?: (old: Draft<TQueryData>, newValue: TVariables) => void
}

function useOptFns<TData, TVariables, TQueryData>(
  options?: UseOptimisticMutationOptions<TData, TVariables, TQueryData>,
) {
  const qc = useQueryClient()

  if (!options) {
    return {}
  }

  const invalidateKey = options.invalidateKey

  if (!invalidateKey) {
    invariant(!!options?.setData, "setData won't work without invalidateQuery")

    return {}
  }

  const onSuccess = async (
    data: TData,
    variables: TVariables,
    context: Context<TQueryData>,
  ) => {
    await qc.invalidateQueries(invalidateKey)
    if (options?.onSuccess) {
      options.onSuccess(data, variables, context)
    }
  }

  const setData = options.setData
  if (!setData) {
    return { onSuccess }
  }

  const onMutate = async (values: TVariables): Promise<Context<TQueryData>> => {
    await qc.cancelQueries(invalidateKey)

    const previous: TQueryData | undefined = qc.getQueryData(invalidateKey)

    qc.setQueryData(invalidateKey, (old?: TQueryData) =>
      produce(old, (draft: any) => setData(draft, values)),
    )

    if (options?.onMutate) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      const r = options.onMutate(values)
      if (r instanceof Promise) {
        r.catch(console.error)
      }
    }

    return previous ? { previous } : undefined
  }

  const onError = (
    error: Error,
    variables: TVariables,
    context?: Context<TQueryData>,
  ) => {
    qc.setQueryData(invalidateKey, context?.previous)
    if (options?.onError) {
      options.onError(error, variables, context)
    }
  }

  return { onMutate, onSuccess, onError }
}

export function useOptimistic<TData, TVariables, TQueryData>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseOptimisticMutationOptions<TData, TVariables, TQueryData>,
): UseMutationResult<TData, Error, TVariables, Context<TQueryData>> {
  return useRQMutation({ mutationFn, ...options, ...useOptFns(options) })
}

export function safeMutation<Spec extends z.ZodTypeAny>(spec: Spec) {
  return function useSafeMutation<TVariables, TQueryData>(
    mutationFn: MutationFunction<z.infer<Spec>, TVariables>,
    options?: UseOptimisticMutationOptions<
      z.infer<Spec>,
      TVariables,
      TQueryData
    >,
  ): UseMutationResult<z.infer<Spec>, Error, TVariables, Context<TQueryData>> {
    const { data, ...rest } = useRQMutation({
      mutationFn,
      ...options,
      ...useOptFns(options),
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
): UseMutationResult<z.infer<Spec>, Error, TVariables, Context<TQueryData>> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => safeMutation(spec), [])
  return useHook(mutationFn, options)
}
