import {
  keysfn,
  type EndpointBase,
  type EndpointRecordBase,
  type GetParamsArg,
  type GetRequestArg,
  type Params,
} from '@srtp/core'
import { capitalize, entries, filter, map, pipe } from '@srtp/fn'
import type { QueryKey, UseMutationResult } from '@tanstack/react-query'

import {
  actionMutation,
  apiMutation,
  epQuery,
  type ApiMutationArgs,
  type QueryArgs,
  type TData,
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

type EQSDescription<Ep extends EndpointBase> = GetParamsArg<Ep> &
  GetRequestArg<Ep> & { readonly invalidateKey?: QueryKey }

export type InvalidateContext<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get' ? K : never]: (
    params?: Params<Eps[K]['path']>,
  ) => QueryKey
}

type EQSHandler<Eps extends EndpointRecordBase, Ep extends EndpointBase> = (
  variables: any,
  context: InvalidateContext<Eps>,
) => EQSDescription<Ep>

export type EQSActionHandlers<Eps extends EndpointRecordBase> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? never
    : K]: EQSHandler<Eps, Eps[K]>
}

export type UseActionMutationResult<
  Ep extends EndpointBase,
  TVariables,
  TContext,
> = UseMutationResult<TData<Ep>, Error, TVariables, TContext>

export type MutationFn<Ep extends EndpointBase> = <TVariables, TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseActionMutationResult<Ep, TVariables, TContext>

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

export type ActionMutationFn<Ep extends EndpointBase, TVariables> = <TContext>(
  options: ApiMutationArgs<Ep, TContext>,
) => UseActionMutationResult<Ep, TVariables, TContext>

export type ActionMutations<
  Eps extends EndpointRecordBase,
  Actions extends EQSActionHandlers<Eps>,
> = {
  readonly [K in keyof Eps as Eps[K]['method'] extends 'get'
    ? never
    : K]: K extends keyof Actions
    ? ActionMutationFn<Eps[K], Parameters<Actions[K]>[0]>
    : never
}

export type ActionsEndpointApi<
  Eps extends EndpointRecordBase,
  Actions extends EQSActionHandlers<Eps>,
> = Hookify<Queries<Eps>> & Hookify<ActionMutations<Eps, Actions>>

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
  Actions extends EQSActionHandlers<Eps>,
>(
  eps: Eps,
  baseUrl: string,
  actions: Actions,
): ActionsEndpointApi<Eps, Actions> {
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

// export function createEpOptomisticApi<Eps extends EndpointRecordBase>(
//   endpoints: Eps,
//   baseUrl: string,
// ): OptimisticEndpointApi<Eps> {
//   const queries = createGetApi(endpoints, baseUrl)
//   const mutations = createOptimisticMutationsApi(endpoints, baseUrl)

//   return { ...queries, ...mutations }
// }
