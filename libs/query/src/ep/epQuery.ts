import type {
  EndpointBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/core'
import { cast, isNilSpec, keysfn, linkfn } from '@srtp/core'
import { axios, joinPaths, urlcat } from '@srtp/web'
import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'
import React from 'react'
import invariant from 'tiny-invariant'

import { defaultApi } from '../api'
import { useSimpleQuery, type UseSimpleQueryResult } from '../core/safeQuery'

// ---------------
// epQuery
// ---------------

export type EpQueryArgs<
  Ep extends EndpointBase,
  TQueryFnData,
> = GetRequestArg<Ep> &
  GetParamsArg<Ep> &
  Omit<UseQueryOptions<TQueryFnData, Error, GetEpResponse<Ep>>, 'queryKey'>

export type UseEpQueryResult<Ep extends EndpointBase> = UseSimpleQueryResult<
  NonNullable<Ep['response']>
>

export function epQuery<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method === 'get', 'endpoint must be a GET endpoint')

  return function useEpQuery<TQueryFnData>(
    options: EpQueryArgs<Ep, TQueryFnData>,
  ): UseEpQueryResult<Ep> {
    const paths = keysfn<Ep['path']>(ep.path, options.params)

    const query = ep.request
      ? cast(ep.request, options.request)
      : options.request

    const url = React.useMemo(
      () => urlcat(baseUrl, joinPaths(paths), query),
      [paths, query],
    )

    const queryFn: QueryFunction<any> = async () => {
      // @TODO: must use the axiosFn from options
      const [data] = await defaultApi.get$(url)
      return data
    }

    invariant(ep.response, 'endpoint must have a response schema')

    return useSimpleQuery<Ep['response'], TQueryFnData>({
      paths,
      query,
      spec: ep.response,
      queryFn,
      ...options,
    })
  }
}

// ---------------
// epMutation
// ---------------

export type EpMutationDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep>

export type EpMutationArgs<
  Ep extends EndpointBase,
  TVariables,
  TContext,
> = UseMutationOptions<GetEpResponse<Ep>, Error, TVariables, TContext> & {
  action: (variables: TVariables) => EpMutationDescription<Ep>
  invalidateKey?: QueryKey
}

export function epMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method !== 'get', 'endpoint must be a GET endpoint')

  return function useEpMutationBase<TVariables, TContext>(
    options: EpMutationArgs<Ep, TVariables, TContext>,
  ): UseMutationResult<TApiData<Ep>, Error, TVariables, TContext> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<
      TApiData<Ep>,
      TVariables
    > = async variables => {
      const { params, request } = options.action(variables)

      const key = linkfn<Ep['path']>(ep.path)(params)
      const url = urlcat(baseUrl, key)
      const [data] = await axios({ method: ep.method, url, body: request })

      return ep.response && isNilSpec(ep.response)
        ? cast(ep.response, data)
        : data
    }

    return useMutation<TApiData<Ep>, Error, TVariables, TContext>({
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

// ---------------
// apiMutation
// ---------------

export type TApiData<Ep extends EndpointBase> = GetEpResponse<Ep>
export type TApiVariables<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep>

export type ApiMutationArgs<Ep extends EndpointBase, TContext> = Omit<
  EpMutationArgs<Ep, TApiVariables<Ep>, TContext>,
  'action'
>

export type UseApiMutationResult<
  Ep extends EndpointBase,
  TContext,
> = UseMutationResult<TApiData<Ep>, Error, TApiVariables<Ep>, TContext>

export function apiMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  const action = (variables: TApiVariables<Ep>) => variables

  const useEpMutation = epMutation(ep, baseUrl)

  return function useApiMutation<TContext>(
    options: ApiMutationArgs<Ep, TContext>,
  ): UseMutationResult<TApiData<Ep>, Error, TApiVariables<Ep>, TContext> {
    return useEpMutation({ ...options, action })
  }
}

// ---------------
// helper functions
// ---------------

export function useEpQuery<Ep extends EndpointBase, TQueryFnData>(
  endpoint: Ep,
  baseUrl: string,
  options: EpQueryArgs<Ep, TQueryFnData>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epQuery(endpoint, baseUrl), [])
  return useHook(options)
}

export function useEpMutation<Ep extends EndpointBase, TVariables, TContext>(
  endpoint: Ep,
  baseUrl: string,
  options: EpMutationArgs<Ep, TVariables, TContext>,
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

// export type UseOptimisticArgs<
//   Ep extends EndpointBase,
//   TVariables,
//   TQueryData,
// > = EpMutationArgs<Ep, TVariables, { previous: TQueryData }> & {
//   update: (old: TQueryData, newValue: TVariables) => TQueryData
//   invalidateKey: QueryKey
// }

// export function epOptimistic<Ep extends EndpointBase, TVariables>(
//   ep: Ep,
//   baseUrl: string,
// ) {
//   return function useEpOptimistic<TQueryData>(
//     options: UseOptimisticArgs<Ep, TVariables, TQueryData>,
//   ) {
//     const qc = useQueryClient()

//     const invalidateKey = options.invalidateKey

//     const onMutate = async (
//       values: TVariables,
//     ): Promise<{ previous: TQueryData } | undefined> => {
//       await qc.cancelQueries(invalidateKey)

//       const previous: TQueryData | undefined = qc.getQueryData(invalidateKey)

//       qc.setQueryData(invalidateKey, (old: any) =>
//         options.update(old, values as any),
//       )

//       return previous ? { previous } : undefined
//     }

//     return useEpMutation<Ep, TVariables, { previous: TQueryData }>(
//       ep,
//       baseUrl,
//       {
//         ...options,
//         onMutate,

//         onSettled: () => qc.invalidateQueries(invalidateKey),

//         onError: (_err, _, context) =>
//           qc.setQueryData(invalidateKey, context?.previous),
//       },
//     )
//   }
// }

// export function epOptimisticMutations<Eps extends EndpointRecordBase>(
//   eps: Eps,
//   baseUrl: string,
// ) {
//   return omap$(eps, ep => epOptimistic(ep, baseUrl)) as any
// }

// export type EpMutationsHooks<Eps extends EndpointRecordBase> = {
//   [K in keyof Eps as `use${Capitalize<K & string>}Mutation`]: (
//     options: MutationArgs<Eps[K], any, any>,
//   ) => UseMutationResult<GetEpResponse<Eps[K]>, Error, any, any>
// }

// export function epMutations<Eps extends EndpointRecordBase>(
//   eps: Eps,
//   baseUrl: string,
// ): EpMutationsHooks<Eps> {
//   return omap$(eps, ep => epActionMutation(ep, baseUrl)) as any
// }

// export type EpQueriesHooks<Eps extends EndpointRecordBase> = {
//   [K in keyof Eps as `use${Capitalize<K & string>}Query`]: <TQueryFnData>(
//     options: QueryArgs<Eps[K], TQueryFnData>,
//   ) => UseEpQueryResult<Eps[K]>
// }

// export function epQueries<Eps extends EndpointRecordBase>(
//   eps: Eps,
//   baseUrl: string,
// ): EpQueriesHooks<Eps> {
//   return omap$(eps, ep => epQuery(ep, baseUrl)) as any
// }
