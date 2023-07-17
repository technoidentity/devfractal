import { capitalize } from '@srtp/local-state'
import type { useQuery, useMutation } from '@tanstack/react-query'
import type { EndpointBase, EndpointsBase } from './endpoint'
import {
  type QueryArgs,
  type MutationArgs,
  createEndPointQuery,
  createEndpointMutation,
} from './endpointQuery'

export type QueryFn<Ep extends EndpointBase> = (
  options: QueryArgs<Ep>,
) => ReturnType<typeof useQuery>

export type MutationFn<Ep extends EndpointBase> = (
  options: MutationArgs<Ep>,
) => ReturnType<typeof useMutation>

export type Queries<Ep extends EndpointsBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? K
    : never]: QueryFn<Ep[K]>
}

export type Mutations<Ep extends EndpointsBase> = {
  readonly [K in keyof Ep as Ep[K]['method'] extends 'get'
    ? never
    : K]: MutationFn<Ep[K]>
}

export type Hookify<R extends Record<string, unknown>> = {
  readonly [K in keyof R as `use${Capitalize<K & string>}`]: R[K]
}

export type EndpointApi<Ep extends EndpointsBase> = Hookify<Queries<Ep>> &
  Hookify<Mutations<Ep>>

export function createEndpointApi<Eps extends EndpointsBase>(
  endpoints: Eps,
  baseUrl: string = '/api',
): EndpointApi<Eps> {
  const queries: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method === 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        createEndPointQuery(endpoint, baseUrl),
      ]),
  )

  const mutations: any = Object.fromEntries(
    Object.entries(endpoints)
      .filter(([, endpoint]) => endpoint.method !== 'get')
      .map(([key, endpoint]) => [
        `use${capitalize(key)}`,
        createEndpointMutation(endpoint),
      ]),
  )

  return { ...queries, ...mutations }
}
