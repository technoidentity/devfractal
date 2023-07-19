/* eslint-disable @typescript-eslint/prefer-function-type */
import { capitalize } from '@srtp/fn'
import type { UseMutationResult } from '@tanstack/react-query'
import type {
  EndpointBase,
  EndpointRecordBase,
  GetEpResponse,
} from './endpoint'
import {
  epMutation,
  epQuery,
  type QueryArgs,
  type UseEpMutationOptions,
  type UseEpQueryResult,
} from './epQuery'

export type QueryFn<Ep extends EndpointBase> = (
  options: QueryArgs<Ep>,
) => UseEpQueryResult<Ep>

export type MutationFn<Ep extends EndpointBase> = {
  <TVariables, TContext>(
    options: UseEpMutationOptions<Ep, TVariables, TContext>,
  ): UseMutationResult<GetEpResponse<Ep>, Error, TVariables>
}
export type Queries<Ep extends EndpointRecordBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? K
    : never]: QueryFn<Ep[K]>
}

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

export function createEpApi<Eps extends EndpointRecordBase>(
  endpoints: Eps,
  baseUrl: string,
): EndpointApi<Eps> {
  const queries: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method === 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        epQuery(endpoint as EndpointBase, baseUrl),
      ]),
  )

  const mutations: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method !== 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        epMutation(endpoint as EndpointBase, baseUrl),
      ]),
  )

  return { ...queries, ...mutations }
}
