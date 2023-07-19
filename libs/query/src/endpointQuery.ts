import type { EndpointBase, Params } from '@srtp/endpoint'
import { linkfn } from '@srtp/endpoint'
import { cast } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  type UseQueryResult,
} from '@tanstack/react-query'
import qs from 'query-string'
import axios from 'redaxios'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

export type QueryArgs<Ep extends EndpointBase> = (Ep extends {
  request: never
}
  ? { query: z.infer<Ep['request'] & object> }
  : { query?: undefined }) &
  (object extends Params<Ep['path']>
    ? { request?: undefined } | undefined
    : { request: Params<Ep['path']> })

export function createEndPointQuery<Ep extends EndpointBase>(
  endpoint: Ep,
  baseUrl: string,
) {
  return (
    options: QueryArgs<Ep>,
  ): UseQueryResult<z.infer<Ep['response'] & object>> => {
    const path = linkfn<Ep['path']>(endpoint.path)(options.request)
    const query = options.query
    const url = query
      ? `${baseUrl}${path}?${qs.stringify(query)}`
      : `${baseUrl}${path}`

    const queryKey = query ? [path, query] : [path]

    const queryFn = () => axios.get(url).then(r => r.data)

    const result = useQuery({ queryKey, queryFn })

    invariant(endpoint.response, 'endpoint must have a response schema')

    const data = cast(endpoint.response, result.data)

    return { ...result, data }
  }
}

export type MutationArgs<Ep extends EndpointBase> = (Ep extends {
  request: unknown
}
  ? { body: z.infer<Ep['request'] & object> }
  : { body?: undefined }) &
  (keyof Params<Ep['path']> extends never
    ? { request?: undefined } | undefined
    : { request: Params<Ep['path']> })

export function createEndpointMutation<Ep extends EndpointBase>(endpoint: Ep) {
  return () =>
    useMutation({
      mutationFn: (options: MutationArgs<Ep>) => {
        const key = linkfn<Ep['path']>(endpoint.path)(options.request)
        return axios[endpoint.method](key, options.body)
      },
    })
}
