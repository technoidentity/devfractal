import type {
  EndpointBase,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/core'
import {
  cast,
  isNilSpec,
  keysfn,
  linkfn,
  type EndpointRecordBase,
  type Params,
} from '@srtp/core'
import { capitalize, entries, filter, map, pipe } from '@srtp/fn'
import { useEvent } from '@srtp/react'
import { axios, joinPaths, urlcat } from '@srtp/web'
import {
  useMutation,
  useQueryClient,
  type MutationFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
} from '@tanstack/react-query'
import React from 'react'
import invariant from 'tiny-invariant'

import { defaultApi } from '../api'
import { useSafeQuery, type UseSafeQueryResult } from '../core/safeQuery'
import type { Hookify } from './common'
import type { Queries } from './epApi'

export type QueryArgs<
  Ep extends EndpointBase,
  TQueryFnData,
> = GetRequestArg<Ep> &
  GetParamsArg<Ep> &
  Omit<UseQueryOptions<TQueryFnData, Error, GetEpResponse<Ep>>, 'queryKey'>

export type UseEpQueryResult<Ep extends EndpointBase> = UseSafeQueryResult<
  NonNullable<Ep['response']>
>

/**
 * Creates a React Query hook for a GET endpoint.
 * @template Ep - The type of the endpoint.
 * @param {Ep} ep - The endpoint.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {function(options: QueryArgs<Ep, TQueryFnData>): UseEpQueryResult<Ep>} - The React Query hook.
 */
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

    return useSafeQuery<Ep['response'], TQueryFnData>({
      paths,
      query,
      spec: ep.response,
      queryFn,
      ...options,
    })
  }
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

/**
 * Creates a React Query hook for a non-GET endpoint.
 * @template Ep - The type of the endpoint.
 * @param {Ep} ep - The mutation endpoint.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {function(options: MutationArgs<Ep, TVariables, TContext>): UseMutationResult<GetEpResponse<Ep>, Error, TVariables, TContext>} - The React Query mutation hook. You need to return params and request from action function.
 */
export function epMutation<Ep extends EndpointBase>(ep: Ep, baseUrl: string) {
  invariant(ep.method !== 'get', 'endpoint must be a GET endpoint')

  return function useEpMutationBase<TVariables, TContext>(
    options: MutationArgs<Ep, TVariables, TContext>,
  ): UseMutationResult<TData<Ep>, Error, TVariables, TContext> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<
      TData<Ep>,
      TVariables
    > = async variables => {
      const { params, request } = options.action(variables)

      const key = linkfn<Ep['path']>(ep.path)(params)
      const url = urlcat(baseUrl, key)
      const [data] = await axios({ method: ep.method, url, body: request })

      return ep.response ? cast(ep.response, data) : data
    }

    return useMutation<TData<Ep>, Error, TVariables, TContext>({
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

export function actionMutation<Ep extends EndpointBase, TVariables>(
  ep: Ep,
  baseUrl: string,
  action: (variables: TVariables) => MutationDescription<Ep>,
) {
  const fn = epMutation(ep, baseUrl)

  return function useEpMutationBase<TContext>(
    options: Omit<MutationArgs<Ep, TVariables, TContext>, 'action'>,
  ): UseMutationResult<TData<Ep>, Error, TVariables, TContext> {
    return fn({ ...options, action })
  }
}

export type TData<Ep extends EndpointBase> = GetEpResponse<Ep>
export type TVariables<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & {
    invalidateKey?: QueryKey
  }

export type ApiMutationArgs<Ep extends EndpointBase, TContext> = Omit<
  MutationArgs<Ep, TVariables<Ep>, TContext>,
  'action'
>

export type UseApiMutationResult<
  Ep extends EndpointBase,
  TContext,
> = UseMutationResult<TData<Ep>, Error, TVariables<Ep>, TContext>

/**
 * Creates a React Query hook for a non-GET endpoint.
 * @template Ep - The type of the endpoint.
 * @param {Ep} ep - The mutation endpoint.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {function(options: ApiMutationArgs<Ep, TContext>): UseMutationResult<GetEpResponse<Ep>, Error, TVariables<Ep>, TContext>} - The React Query mutation hook. You need to pass params and request to mutate function.
 */

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
        const invalidateKey = variables.invalidateKey ?? options?.invalidateKey
        if (invalidateKey) {
          qc.invalidateQueries(invalidateKey).catch(console.error)
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
  action: (variables: TVariables) => MutationDescription<Ep>,
  options: MutationArgs<Ep, TVariables, TContext>,
) {
  const useHook = React.useMemo(
    () => actionMutation(endpoint, baseUrl, action),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

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

export type UseOptimisticArgs<
  Ep extends EndpointBase,
  TVariables,
  TQueryData,
> = MutationArgs<Ep, TVariables, { previous: TQueryData }> & {
  update: (old: TQueryData, newValue: TVariables) => TQueryData
  invalidateKey: QueryKey
}

export function epOptimistic<Ep extends EndpointBase, TVariables>(
  ep: Ep,
  baseUrl: string,
  mutation: (variables: TVariables) => MutationDescription<Ep>,
) {
  return function useEpOptimistic<TQueryData>(
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
      mutation,
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

type EpStateDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { readonly invalidateKey?: QueryKey }

type EpStateHandler<Eps extends EndpointRecordBase, Ep extends EndpointBase> = (
  variables: any,
  context: InvalidateContext<Eps>,
) => EpStateDescription<Ep>

export type EpStateActionHandlers<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? never
    : K]: EpStateHandler<Eps, Eps[K]>
}

export type InvalidateContext<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get' ? K : never]: (
    params?: Params<Eps[K]['path']>,
  ) => QueryKey
}

export type UseEpStateMutationResult<
  Ep extends EndpointBase,
  TVariables,
  TContext,
> = UseMutationResult<TData<Ep>, Error, TVariables, TContext>

export type EpStateMutationFn<Ep extends EndpointBase, TVariables> = <TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseEpStateMutationResult<Ep, TVariables, TContext>

export type EpStateMutations<
  Eps extends EndpointRecordBase,
  Actions extends EpStateActionHandlers<Eps>,
> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? never
    : K]: K extends keyof Actions
    ? EpStateMutationFn<Eps[K], Parameters<Actions[K]>[0]>
    : never
}

export type EpStateEndpointApi<
  Eps extends EndpointRecordBase,
  Actions extends EpStateActionHandlers<Eps>,
> = Hookify<Queries<Eps>> & Hookify<EpStateMutations<Eps, Actions>>

function createInvalidateContext<Eps extends EndpointRecordBase>(
  endpoints: Eps,
): InvalidateContext<Eps> {
  return pipe(
    endpoints,
    entries,
    filter(([, endpoint]) => endpoint.method === 'get'),
    map(([key, endpoint]) => [key, [keysfn(endpoint.path)]]),
    Object.fromEntries,
  )
}

export function epQueryState<
  Eps extends EndpointRecordBase,
  Actions extends EpStateActionHandlers<Eps>,
>(
  eps: Eps,
  baseUrl: string,
  actions: Actions,
): EpStateEndpointApi<Eps, Actions> {
  const queries = createGetApi(eps, baseUrl)
  const context = createInvalidateContext(eps)

  const mutations = pipe(
    eps,
    entries,
    filter(([, ep]) => ep.method !== 'get'),
    map(([key, ep]) => [
      `use${capitalize(key)}`,
      actionMutation(ep, baseUrl, (actions as any)[key]),
    ]),
    Object.fromEntries,
  )

  return { ...queries, ...mutations, context }
}

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
