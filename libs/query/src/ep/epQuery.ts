import { cast, isNilSpec } from '@srtp/core'
import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'

import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/core'

import { keysfn, linkfn } from '@srtp/core'
import { omap$ } from '@srtp/fn'
import { useEvent } from '@srtp/react'
import { axios, joinPaths, urlcat } from '@srtp/web'
import React from 'react'
import invariant from 'tiny-invariant'
import { defaultApi } from '../api'
import { useSafeQuery, type UseSafeQueryResult } from '../safeQuery'

export type QueryArgs<
  Ep extends EndpointBase,
  TQueryFnData,
> = GetRequestArg<Ep> &
  GetParamsArg<Ep> &
  Omit<UseQueryOptions<TQueryFnData, Error, GetEpResponse<Ep>>, 'queryKey'>

export type UseEpQueryResult<Ep extends EndpointBase> = UseSafeQueryResult<
  NonNullable<Ep['response']>
>

export function epQuery<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method === 'get', 'endpoint must be a GET endpoint')

  return function useEpQuery<TQueryFnData>(
    options: QueryArgs<Ep, TQueryFnData>,
  ): UseEpQueryResult<Ep> {
    const paths = keysfn<Ep['path']>(ep.path, options.params)

    const query = ep.request
      ? cast(ep.request, options.request)
      : options.request

    const url = React.useMemo(
      () => urlcat(baseUrl, joinPaths(paths), query),
      [paths, query],
    )
    const queryFn = useEvent(
      () => defaultApi.get$(url) as Promise<TQueryFnData>,
    )

    invariant(ep.response, 'endpoint must have a response schema')
    // @TODO: replace above with ep.repsonse = z.ZodUndefined() when not defined?
    return useSafeQuery<Ep['response'], TQueryFnData>({
      paths,
      query,
      spec: ep.response,
      queryFn,
      ...options,
    })
  }
}

export type EpQueriesHooks<Eps extends EndpointRecordBase> = {
  [K in keyof Eps as `use${Capitalize<K & string>}Query`]: <TQueryFnData>(
    options: QueryArgs<Eps[K], TQueryFnData>,
  ) => UseEpQueryResult<Eps[K]>
}

export function epQueries<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrl: string,
): EpQueriesHooks<Eps> {
  return omap$(eps, ep => epQuery(ep, baseUrl)) as any
}

export type MutationDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep>

export type MutationArgs<
  Ep extends EndpointBase,
  TVariables,
  TContext,
> = UseMutationOptions<GetEpResponse<Ep>, Error, TVariables, TContext> & {
  action: (variables: TVariables) => MutationDescription<Ep>
  invalidateKey?: QueryKey
}

export function epMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method !== 'get', 'endpoint must be a GET endpoint')

  type TData = GetEpResponse<Ep>

  return function useEpMutationBase<TVariables, TContext>(
    options: MutationArgs<Ep, TVariables, TContext>,
  ): UseMutationResult<TData, Error, TVariables, TContext> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<TData, TVariables> = async variables => {
      const { params, request } = options.action(variables)

      const key = linkfn<Ep['path']>(ep.path)(params)
      const url = urlcat(baseUrl, key)
      const [data] = await axios({ method: ep.method, url, body: request })

      return ep.response ? cast(ep.response, data) : data
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

type TData<Ep extends EndpointBase> = GetEpResponse<Ep>
type TVariables<Ep extends EndpointBase> = GetParamsArg<Ep> & GetRequestArg<Ep>

export type ApiMutationArgs<Ep extends EndpointBase, TContext> = Omit<
  MutationArgs<Ep, TVariables<Ep>, TContext>,
  'action'
>

export type UseApiMutationResult<
  Ep extends EndpointBase,
  TContext,
> = UseMutationResult<TData<Ep>, Error, TVariables<Ep>, TContext>

export function apiMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method !== 'get', 'endpoint must be a GET endpoint')

  return function useEpMutationBase<TContext>(
    options: ApiMutationArgs<Ep, TContext>,
  ): UseMutationResult<TData<Ep>, Error, TVariables<Ep>, TContext> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<
      TData<Ep>,
      TVariables<Ep>
    > = async variables => {
      const { params, request } = variables

      const key = linkfn<Ep['path']>(ep.path)(params)
      const url = urlcat(baseUrl, key)
      const [data] = await axios({ method: ep.method, url, body: request })

      // this should be fine as there is no 'select' option like useQuery
      return ep.response && isNilSpec(ep.response)
        ? cast(ep.response, data)
        : data
    }

    return useMutation<TData<Ep>, Error, TVariables<Ep>, TContext>({
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

export function useEpQuery<Ep extends EndpointBase, TQueryFnData>(
  endpoint: Ep,
  baseUrl: string,
  options: QueryArgs<Ep, TQueryFnData>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epQuery(endpoint, baseUrl), [])
  return useHook(options)
}

export function useEpMutation<Ep extends EndpointBase, TVariables, TContext>(
  endpoint: Ep,
  baseUrl: string,
  options: MutationArgs<Ep, TVariables, TContext>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epMutation(endpoint, baseUrl), [])
  return useHook(options)
}

export function useApiMutation<Ep extends EndpointBase, TContext>(
  endpoint: Ep,
  baseUrl: string,
  options: ApiMutationArgs<Ep, TContext>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => apiMutation(endpoint, baseUrl), [])
  return useHook(options)
}

export type EpMutationsHooks<Eps extends EndpointRecordBase> = {
  [K in keyof Eps as `use${Capitalize<K & string>}Mutation`]: (
    options: MutationArgs<Eps[K], any, any>,
  ) => UseMutationResult<GetEpResponse<Eps[K]>, Error, any, any>
}

export function epMutations<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrl: string,
): EpMutationsHooks<Eps> {
  return omap$(eps, ep => epMutation(ep, baseUrl)) as any
}

export type UseOptimisticArgs<
  Ep extends EndpointBase,
  TVariables,
  TQueryData,
> = MutationArgs<Ep, TVariables, { previous: TQueryData }> & {
  mutation: (variables: TVariables) => MutationDescription<Ep>
  update: (old: TQueryData, newValue: TVariables) => TQueryData
  invalidateKey: QueryKey
}

export function epOptimistic<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  return function useEpOptimistic<TVariables, TQueryData>(
    options: UseOptimisticArgs<Ep, TVariables, TQueryData>,
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

// @TODO: apiOptimistic

export function epOptimisticMutations<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrl: string,
) {
  return omap$(eps, ep => epOptimistic(ep, baseUrl)) as any
}
