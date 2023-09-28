import {
  keysfn,
  type EndpointBase,
  type EndpointRecordBase,
  type Params,
} from '@srtp/core'
import { capitalize, entries, filter, map, pipe } from '@srtp/fn'
import type { QueryKey, UseMutationResult } from '@tanstack/react-query'

import type { Hookify } from './common'
import {
  apiMutation,
  epMutation,
  epQuery,
  type ApiMutationArgs,
  type EpMutationDescription,
  type EpQueryArgs,
  type TApiData,
  type TApiVariables,
  type UseEpQueryResult,
} from './epQuery'

export type EpQueryFn<Ep extends EndpointBase> = <TQueryFnData>(
  options: EpQueryArgs<Ep, TQueryFnData>,
) => UseEpQueryResult<Ep>

export type EpQueries<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? K
    : never]: EpQueryFn<Ep[K]>
}

export type EpMutationFn<Ep extends EndpointBase> = <TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseMutationResult<TApiData<Ep>, Error, TApiVariables<Ep>, TContext>

export type EpMutations<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? never
    : K]: EpMutationFn<Ep[K]>
}

export type EpApi<Ep extends EndpointRecordBase> = Hookify<EpQueries<Ep>> &
  Hookify<EpMutations<Ep>>

function createGetApi<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrl: string,
) {
  return pipe(
    eps,
    entries,
    filter(([, ep]) => ep.method === 'get'),
    map(([key, ep]) => [`use${capitalize(key)}`, epQuery(ep, baseUrl)]),
    Object.fromEntries,
  )
}

function createMutationsApi<Eps extends EndpointRecordBase>(
  eps: Eps,
  baseUrl: string,
) {
  return pipe(
    eps,
    entries,
    filter(([, ep]) => ep.method !== 'get'),
    map(([key, ep]) => [`use${capitalize(key)}`, apiMutation(ep, baseUrl)]),
    Object.fromEntries,
  )
}

/**
 * Creates a regular endpoint API object based on the provided endpoints and base URL.
 * @template Eps - The type of the named endpoints object.
 * @param {Eps} endpoints - The named endpoints object.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {EpApi<Eps>} - named hooks based api.
 */
export function createEpApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
): EpApi<Eps> {
  const queries = createGetApi(endpoints, baseUrl)
  const mutations = createMutationsApi(endpoints, baseUrl)

  return { ...queries, ...mutations }
}

// ------------------
// ep query state
// ------------------

export type InvalidateContext<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get' ? K : never]: (
    params?: Params<Eps[K]['path']>,
  ) => QueryKey
}

type EpStateHandler<Eps extends EndpointRecordBase, Ep extends EndpointBase> = (
  variables: any,
  context: InvalidateContext<Eps>,
) => EpMutationDescription<Ep>

export type EpStateActionHandlers<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? never
    : K]: EpStateHandler<Eps, Eps[K]>
}

export type EpStateMutationFn<Ep extends EndpointBase, TVariables> = <TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseMutationResult<TApiData<Ep>, Error, TVariables, TContext>

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
> = Hookify<EpQueries<Eps>> & Hookify<EpStateMutations<Eps, Actions>>

function createInvalidateContext<Eps extends EndpointRecordBase>(
  eps: Eps,
): InvalidateContext<Eps> {
  return pipe(
    eps,
    entries,
    filter(([, ep]) => ep.method === 'get'),
    map(([key, ep]) => [key, (params: any) => keysfn(ep.path, params)]),
    Object.fromEntries,
  )
}

function epStateMutation<Ep extends EndpointBase>(
  ep: Ep,
  baseUrl: string,
  action: (variables: TApiVariables<Ep>) => TApiVariables<Ep>,
) {
  const useEpMutation = epMutation(ep, baseUrl)

  return function useEpStateMutation<TContext>(
    options: ApiMutationArgs<Ep, TContext>,
  ): UseMutationResult<TApiData<Ep>, Error, TApiVariables<Ep>, TContext> {
    return useEpMutation({ ...options, action })
  }
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
      epStateMutation(ep, baseUrl, variables =>
        (actions as any)[key](variables, context),
      ),
    ]),
    Object.fromEntries,
  )

  return { ...queries, ...mutations, context }
}

// export type OptimisticMutationFn<Ep extends EndpointBase> = <
//   TVariables,
//   TContext,
// >(
//   options: UseOptimisticArgs<Ep, TVariables, TContext>,
// ) => UseMutationResult<GetEpResponse<Ep>, Error, TVariables>

// export type OptimisticMutations<Ep extends EndpointRecordBase> = {
//   readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
//     ? never
//     : K]: OptimisticMutationFn<Ep[K]>
// }

// export type OptimisticEndpointApi<Ep extends EndpointRecordBase> = Hookify<
//   Queries<Ep>
// > &
//   Hookify<OptimisticMutations<Ep>>

// function createOptimisticMutationsApi<Eps extends EndpointRecordBase>(
//   endpoints: Eps,
//   baseUrl: string,
// ) {
//   return pipe(
//     eps,
//     entries,
//     filter(([, ep]) => ep.method !== 'get'),
//     map(([key, ep]) => [
//       `use${capitalize(key)}`,
//       epOptimistic(ep, baseUrl),
//     ]),
//     Object.fromEntries,
//   )
// }

// export function createEpOptomisticApi<Eps extends EndpointRecordBase>(
//   eps: Eps,
//   baseUrl: string,
// ): OptimisticEndpointApi<Eps> {
//   const queries = createGetApi(eps, baseUrl)
//   const mutations = createOptimisticMutationsApi(eps, baseUrl)

//   return { ...queries, ...mutations }
// }
