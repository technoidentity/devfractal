import { cast } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'

import { type z } from 'zod'
import type {
  EndpointBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/endpoint'

import React from 'react'
import invariant from 'tiny-invariant'
import { linkfn } from '@srtp/endpoint'
import { axios, urlcat } from '@srtp/web'
import { defaultApi } from '../api'

export type QueryArgs<Ep extends EndpointBase> = GetRequestArg<Ep> &
  GetParamsArg<Ep>

const createQfn = (url: string) => async () => defaultApi.get(url)

export type UseEpQueryResult<Ep extends EndpointBase> = Readonly<{
  result: UseQueryResult<z.infer<Ep['response'] & object>, Error>
  data: z.infer<Ep['response'] & object>
  invalidateKey: QueryKey
}>

export function epQuery<Ep extends EndpointBase>(
  endpoint: Ep,
  baseUrl: string,
) {
  return function useEpQuery(options: QueryArgs<Ep>): UseEpQueryResult<Ep> {
    // const url = urlcat(baseUrl, route(endpoint.path), options.path)

    const path = linkfn<Ep['path']>(endpoint.path)(options.params)
    const query = options.request
    const url = urlcat(baseUrl, path, query)

    // @TODO: what should be the path? split or concat?
    const queryKey = query ? [path, query] : [path]

    const result: any = useQuery({ queryKey, queryFn: createQfn(url) })

    invariant(endpoint.response, 'endpoint must have a response schema')

    const data = cast(endpoint.response, result.data)

    return { data, result, invalidateKey: queryKey }
  }
}

export type MutationDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep>

export type UseEpMutationOptions<
  Ep extends EndpointBase,
  TVariables,
  TContext,
> = UseMutationOptions<GetEpResponse<Ep>, Error, TVariables, TContext> & {
  action: (variables: TVariables) => MutationDescription<Ep>
  invalidateKey?: QueryKey
}

export function epMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  type TData = GetEpResponse<Ep>

  return function useEpMutationBase<TVariables, TContext>(
    options: UseEpMutationOptions<Ep, TVariables, TContext>,
  ): UseMutationResult<TData, Error, TVariables> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<TData, TVariables> = async variables => {
      const { params: path, request } = options.action(variables)

      const key = linkfn<Ep['path']>(ep.path)(path)
      const url = `${baseUrl}${key}`
      const [data] = await axios({
        method: ep.method,
        url,
        body: request,
      })

      const result = ep.response ? cast(ep.response, data) : data
      return result
    }

    return useMutation<TData, Error, TVariables, TContext>({
      mutationFn,
      ...options,
      onSettled: (data, error, variables, context) => {
        if (options?.invalidateKey) {
          qc.invalidateQueries(options?.invalidateKey).catch(console.error)
        }
        if (options?.onSettled) {
          options.onSettled(data, error, variables, context)
        }
      },
    })
  }
}

export function useEpQuery<Ep extends EndpointBase>(
  endpoint: Ep,
  baseUrl: string,
  options: QueryArgs<Ep>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epQuery(endpoint, baseUrl), [])
  return useHook(options)
}

export function useEpMutation<Ep extends EndpointBase, TVariables, TContext>(
  endpoint: Ep,
  baseUrl: string,
  options: UseEpMutationOptions<Ep, TVariables, TContext>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epMutation(endpoint, baseUrl), [])
  return useHook(options)
}

export const useInvalidate = (key: QueryKey) => {
  const qc = useQueryClient()

  return () => qc.invalidateQueries(key).catch(console.error)
}

type UseEpOptimisticOptions<
  Ep extends EndpointBase,
  TVariables,
  TQueryData,
> = UseEpMutationOptions<Ep, TVariables, { previous: TQueryData }> & {
  mutation: (variables: TVariables) => MutationDescription<Ep>
  update: (old: TQueryData, newValue: TVariables) => TQueryData
  invalidateKey: QueryKey
}

export function epOptimistic<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  return function useEpOptimistic<TVariables, TQueryData>(
    options: UseEpOptimisticOptions<Ep, TVariables, TQueryData>,
  ) {
    const qc = useQueryClient()

    const invalidateKey = options.invalidateKey

    const onMutate = async (
      values: TVariables,
    ): Promise<{ previous: TQueryData } | undefined> => {
      await qc.cancelQueries(invalidateKey)

      const previous: TQueryData | undefined = qc.getQueryData(invalidateKey)

      qc.setQueryData(invalidateKey, (old: any) =>
        options.update(old, values as any),
      )

      return previous ? { previous } : undefined
    }

    return useEpMutation<Ep, TVariables, { previous: TQueryData }>(
      ep,
      baseUrl,
      {
        ...options,
        onMutate,

        onSettled: () => qc.invalidateQueries(invalidateKey),

        onError: (_err, _, context) =>
          qc.setQueryData(invalidateKey, context?.previous),
      },
    )
  }
}
