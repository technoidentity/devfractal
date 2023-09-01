import type {
  EndpointBase,
  EndpointRecordBase,
  GetParamsArg,
  GetRequestArg,
} from '@srtp/core'
import { capitalize, entries, filter, map, pipe } from '@srtp/fn'
import type { QueryKey } from '@tanstack/react-query'

import {
  actionMutation,
  apiMutation,
  epQuery,
  type ApiMutationArgs,
  type QueryArgs,
  type UseApiMutationResult,
  type UseEpQueryResult,
} from './epQuery'

export type Hookify<R extends Record<string, unknown>> = {
  readonly [K in keyof R as `use${Capitalize<K & string>}`]: R[K]
}

export type QueryFn<Ep extends EndpointBase> = <TQueryFnData>(
  options: QueryArgs<Ep, TQueryFnData>,
) => UseEpQueryResult<Ep>

export type Queries<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? K
    : never]: QueryFn<Ep[K]>
}

export type MutationFn<Ep extends EndpointBase> = <TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseApiMutationResult<Ep, TContext>

export type Mutations<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? never
    : K]: MutationFn<Ep[K]>
}

export type EndpointApi<Ep extends EndpointRecordBase> = Hookify<Queries<Ep>> &
  Hookify<Mutations<Ep>>

function createGetApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
) {
  return pipe(
    endpoints,
    entries,
    filter(([, endpoint]) => endpoint.method === 'get'),
    map(([key, endpoint]) => [
      `use${capitalize(key)}`,
      epQuery(endpoint, baseUrl),
    ]),
    Object.fromEntries,
  )
}

function createMutationsApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
) {
  return pipe(
    endpoints,
    entries,
    filter(([, endpoint]) => endpoint.method !== 'get'),
    map(([key, endpoint]) => [
      `use${capitalize(key)}`,
      apiMutation(endpoint, baseUrl),
    ]),
    Object.fromEntries,
  )
}

/**
 * Creates a regular endpoint API object based on the provided endpoints and base URL.
 * @template Eps - The type of the named endpoints object.
 * @param {Eps} endpoints - The named endpoints object.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {EndpointApi<Eps>} - named hooks based api.
 */
export function createEpApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
): EndpointApi<Eps> {
  const queries = createGetApi(endpoints, baseUrl)
  const mutations = createMutationsApi(endpoints, baseUrl)

  return { ...queries, ...mutations }
}

type EQSDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { invalidateKey?: QueryKey }

type EQSHandler<Ep extends EndpointBase> = <TVariables>(
  variables: TVariables,
) => EQSDescription<Ep>

export type EQSActionHandlers<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? K
    : never]: EQSHandler<Eps[K]>
}

function createActionMutationsApi<
  Eps extends EndpointRecordBase,
  Actions extends EQSActionHandlers<Eps>,
>(endpoints: Eps, baseUrl: string, actions: Actions) {
  return pipe(
    endpoints,
    entries,
    filter(([, endpoint]) => endpoint.method !== 'get'),
    map(([key, endpoint]) => [
      `use${capitalize(key)}`,
      actionMutation(endpoint, baseUrl, (actions as any)[key]),
    ]),
    Object.fromEntries,
  )
}

export function epQueryState<
  Eps extends EndpointRecordBase,
  Actions extends EQSActionHandlers<Eps>,
>(eps: Eps, baseUrl: string, actions: Actions): EndpointApi<Eps> {
  const mutations = createActionMutationsApi(eps, baseUrl, actions)
  const queries = createGetApi(eps, baseUrl)

  return { ...queries, ...mutations }
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
//     endpoints,
//     entries,
//     filter(([, endpoint]) => endpoint.method !== 'get'),
//     map(([key, endpoint]) => [
//       `use${capitalize(key)}`,
//       epOptimistic(endpoint, baseUrl),
//     ]),
//     Object.fromEntries,
//   )
// }

// /**
//  * Creates an optimistic endpoint API object based on the provided endpoints and base URL.
//  * @template Eps - The type of the named endpoint.
//  * @param {Eps} endpoints - The named endpoint.
//  * @param {string} baseUrl - The base URL for the API.
//  * @returns {OptimisticEndpointApi<Eps>} - named hooks based api with optimistic mutations.
//  */
// export function createEpOptomisticApi<Eps extends EndpointRecordBase>(
//   endpoints: Eps,
//   baseUrl: string,
// ): OptimisticEndpointApi<Eps> {
//   const queries = createGetApi(endpoints, baseUrl)
//   const mutations = createOptimisticMutationsApi(endpoints, baseUrl)

//   return { ...queries, ...mutations }
// }
