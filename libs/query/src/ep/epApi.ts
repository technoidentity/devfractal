import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
} from '@srtp/core'
import { capitalize, entries, filter, map, pipe } from '@srtp/fn'
import type { UseMutationResult } from '@tanstack/react-query'
import {
  apiMutation,
  epOptimistic,
  epQuery,
  type ApiMutationArgs,
  type QueryArgs,
  type UseApiMutationResult,
  type UseEpQueryResult,
  type UseOptimisticArgs,
} from './epQuery'

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

export type Hookify<R extends Record<string, unknown>> = {
  readonly [K in keyof R as `use${Capitalize<K & string>}`]: R[K]
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

export function createEpApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
): EndpointApi<Eps> {
  const queries = createGetApi(endpoints, baseUrl)
  const mutations = createMutationsApi(endpoints, baseUrl)

  return { ...queries, ...mutations }
}

export type OptimisticMutationFn<Ep extends EndpointBase> = <
  TVariables,
  TContext,
>(
  options: UseOptimisticArgs<Ep, TVariables, TContext>,
) => UseMutationResult<GetEpResponse<Ep>, Error, TVariables>

export type OptimisticMutations<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? never
    : K]: OptimisticMutationFn<Ep[K]>
}

export type OptimisticEndpointApi<Ep extends EndpointRecordBase> = Hookify<
  Queries<Ep>
> &
  Hookify<OptimisticMutations<Ep>>

function createOptimisticMutationsApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
) {
  return pipe(
    endpoints,
    entries,
    filter(([, endpoint]) => endpoint.method !== 'get'),
    map(([key, endpoint]) => [
      `use${capitalize(key)}`,
      epOptimistic(endpoint, baseUrl),
    ]),
    Object.fromEntries,
  )
}

export function createEpOptomisticApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
): OptimisticEndpointApi<Eps> {
  const queries = createGetApi(endpoints, baseUrl)
  const mutations = createOptimisticMutationsApi(endpoints, baseUrl)

  return { ...queries, ...mutations }
}
