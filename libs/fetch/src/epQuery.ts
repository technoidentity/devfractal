import { cast } from '@srtp/spec'
import {
  useMutation,
  useQuery,
  useQueryClient,
  type MutationFunction,
  type MutationOptions,
  type QueryKey,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import axios from 'redaxios'
import { type z } from 'zod'
import {
  linkfn,
  type EndpointBase,
  type GetEpResponse,
  type MutationEndpointBase,
  type Params,
  type QueryEndpointBase,
} from './endpoint'

import qs from 'query-string'
import React from 'react'
import invariant from 'tiny-invariant'

type GetPathsArg<Ep extends EndpointBase> = object extends Params<Ep['path']>
  ? { path?: undefined }
  : { path: Params<Ep['path']> }

type GetRequestArg<Ep extends EndpointBase> = Ep extends Ep['request']
  ? { request?: undefined }
  : { request: z.infer<Ep['request'] & object> }

export type QueryArgs<Ep extends EndpointBase> = GetRequestArg<Ep> &
  GetPathsArg<Ep>

const createQfn = (url: string) => async () => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error(`Unknown error fetching from ${url}`, { cause: error })
  }
}

type UseEpQueryResult<Ep extends QueryEndpointBase> = Readonly<{
  result: UseQueryResult<z.infer<Ep['response'] & object>, Error>
  data: z.infer<Ep['response'] & object>
  invalidateKey: QueryKey
}>

const formUrl = (baseUrl: string, path: string, query?: object) => {
  const url = `${baseUrl}${path}`
  return query ? `${url}?${qs.stringify(query)}` : url
}

export function epQuery<Ep extends QueryEndpointBase>(
  endpoint: Ep,
  baseUrl: string,
) {
  return function useEpQuery(options: QueryArgs<Ep>): UseEpQueryResult<Ep> {
    // const url = urlcat(baseUrl, route(endpoint.path), options.path)

    const path = linkfn<Ep['path']>(endpoint.path)(options.path)
    const query = options.request
    const url = formUrl(baseUrl, path, query)

    // @TODO: what should be the path? split or concat?
    const queryKey = query ? [path, query] : [path]

    const result = useQuery<z.infer<Ep['response'] & object>, Error>({
      queryKey,
      queryFn: createQfn(url),
    })

    invariant(endpoint.response, 'endpoint must have a response schema')

    const data = cast(endpoint.response, result.data)

    return { data, result, invalidateKey: queryKey }
  }
}

export type MutationDescription<Ep extends MutationEndpointBase> =
  GetPathsArg<Ep> & GetRequestArg<Ep>

type UseEpMutationOptions<TData, TVariables, TContext> = UseMutationOptions<
  TData,
  Error,
  TVariables,
  TContext
> & { invalidateKey?: QueryKey }

export function epMutation<Ep extends MutationEndpointBase>(
  ep: Ep,
  baseUrl: string,
) {
  type TData = GetEpResponse<Ep>

  return function useEpMutationBase<TVariables, TContext>(
    mutation: (variables: TVariables) => MutationDescription<Ep>,
    options?: UseEpMutationOptions<TData, TVariables, TContext>,
  ): UseMutationResult<TData, Error, TVariables> {
    const qc = useQueryClient()

    const mutationFn: MutationFunction<TData, TVariables> = async variables => {
      const { path, request } = mutation(variables)

      const key = linkfn<Ep['path']>(ep.path)(path)
      const url = `${baseUrl}${key}`
      const response = await axios[ep.method](url, request)

      const result = ep.response
        ? cast(ep.response, response.data)
        : response.data
      return result
    }

    return useMutation<TData, Error, TVariables, TContext>(mutationFn, {
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

export function useEpQuery<Ep extends QueryEndpointBase>(
  endpoint: Ep,
  baseUrl: string,
  options: QueryArgs<Ep>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epQuery(endpoint, baseUrl), [])
  return useHook(options)
}

export function useEpMutation<
  Ep extends MutationEndpointBase,
  TVariables,
  TContext,
>(
  endpoint: Ep,
  baseUrl: string,
  mutation: (variables: TVariables) => MutationDescription<Ep>,
  options?: MutationOptions<GetEpResponse<Ep>, Error, TVariables, TContext>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useHook = React.useMemo(() => epMutation(endpoint, baseUrl), [])
  return useHook(mutation, options)
}

export const useInvalidate = (key: QueryKey) => {
  const qc = useQueryClient()

  return () => qc.invalidateQueries(key).catch(console.error)
}

type UseEpOptimisticOptions<
  Ep extends MutationEndpointBase,
  TVariables,
  TQueryData,
> = UseEpMutationOptions<
  GetEpResponse<Ep>,
  TVariables,
  { previous: TQueryData }
> & {
  mutation: (variables: TVariables) => MutationDescription<Ep>
  update: (old: TQueryData, newValue: TVariables) => TQueryData
  invalidateKey: QueryKey
}

export function epOptimistic<Ep extends MutationEndpointBase>(
  ep: Ep,
  baseUrl: string,
) {
  return function useEpOptimistic<TVariables, TQueryData>(
    options: UseEpOptimisticOptions<Ep, TVariables, TQueryData>,
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
      options.mutation,
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
