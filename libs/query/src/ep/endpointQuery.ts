import type { EndpointBase, GetEpResponse, Params } from '@srtp/core'
import { linkfn } from '@srtp/core'
import { cast } from '@srtp/core'
import { axios, urlcat } from '@srtp/web'
import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

import { defaultApi } from '../api'

export type QueryArgs<Ep extends EndpointBase> = (Ep extends {
  request: never
}
  ? { query: z.infer<NonNullable<Ep['request']>> }
  : { query?: undefined }) &
  (object extends Params<Ep['path']>
    ? { request?: undefined } | undefined
    : { request: Params<Ep['path']> })

export function createEndPointQuery<Ep extends EndpointBase>(
  endpoint: Ep,
  baseUrl: string,
) {
  return (options: QueryArgs<Ep>): UseQueryResult<GetEpResponse<Ep>> => {
    const path = linkfn<Ep['path']>(endpoint.path)(options.request)
    const query = options.query
    const url = urlcat(baseUrl, path, query)

    const queryKey = query ? [path, query] : [path]

    const queryFn = () => defaultApi.get$(url) as Promise<GetEpResponse<Ep>>

    const result = useQuery({ queryKey, queryFn })

    invariant(endpoint.response, 'endpoint must have a response schema')

    return { ...result, data: cast(endpoint.response, result.data) }
  }
}

export type MutationArgs<Ep extends EndpointBase> = (Ep extends {
  request: unknown
}
  ? { body: z.infer<NonNullable<Ep['request']>> }
  : { body?: undefined }) &
  (keyof Params<Ep['path']> extends never
    ? { request?: undefined } | undefined
    : { request: Params<Ep['path']> })

export function createEndpointMutation<Ep extends EndpointBase>(endpoint: Ep) {
  return () =>
    useMutation({
      mutationFn: async (options: MutationArgs<Ep>) => {
        const key = linkfn<Ep['path']>(endpoint.path)(options.request)
        const [data] = await axios({
          method: endpoint.method,
          url: key,
          body: options.body,
        })

        return data
      },
    })
}
