import {
  useQueryClient,
  useMutation as useTanstackMutation,
  type MutationFunction,
} from '@tanstack/react-query'

import type { Schema } from 'zod'
import type { z } from 'zod'
import { ApiDescriptions, type MutationDescription } from './mutationApi'
import { useSafeQuery, type UseSafeQueryArgs } from './safeQuery'
import { axios } from '@srtp/web'
import { cast } from '@srtp/spec'

export type MutationHandler = (
  api: typeof ApiDescriptions,
  variables: any,
) => MutationDescription<any>

export type Handlers = Record<
  string,
  { response: z.ZodTypeAny; action: MutationHandler }
>

async function apiMethod<T>(
  mut: MutationDescription<T>,
  spec: Schema<T>,
): Promise<T> {
  const [data] = await axios({
    method: mut.type,
    url: mut.path,
    body: mut.payload,
  })
  return cast(spec, data)
}

export const simpleQueryState = <
  QuerySpec extends z.ZodTypeAny,
  TQueryFnData,
  Hs extends Handlers,
>(
  queryOptions: UseSafeQueryArgs<QuerySpec, TQueryFnData>,
  mutationHandlers: Hs,
) => {
  const useQuery = (
    moreQueryOptions: Partial<
      Omit<UseSafeQueryArgs<QuerySpec, TQueryFnData>, 'queryKey'>
    >,
  ) => {
    return useSafeQuery({ ...queryOptions, ...moreQueryOptions })
  }

  const useMutation = <Key extends keyof Hs>(key: Key) => {
    const qc = useQueryClient()
    const spec = mutationHandlers[key].response
    const fn = mutationHandlers[key].action

    type TData = z.infer<Hs[Key]['response']>
    type TVariables = Parameters<Hs[Key]['action']>[1]

    const mutationFn: MutationFunction<TData, TVariables> = variables =>
      apiMethod(fn(ApiDescriptions, variables), spec)

    const mutate = useTanstackMutation({
      mutationFn,
      onSettled: () => qc.invalidateQueries(queryOptions.paths),
    })

    return [mutate.mutate, mutate] as const
  }

  return [useQuery, useMutation] as const
}

// const [useTestQuery, useTestMutation] = simpleQueryState(
//   { spec: z.any(), paths: [''], queryFn: () => Promise.resolve({}) },
//   {
//     test: {
//       response: z.number(),
//       action: (api, variables: number) => api.post('/test', variables),
//     },
//     test2: {
//       response: z.string(),
//       action: (api, variables: string) => api.post('/test2', variables),
//     },
//   },
// )
