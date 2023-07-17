import {
  useQueryClient,
  useMutation as useTanstackMutation,
  type MutationFunction,
} from '@tanstack/react-query'
import redaxios from 'redaxios'
import type { Schema, z } from 'zod'
import type { Params, PathBase } from './endpoint'
import { ApiDescriptions, type MutationDescription } from './mutationApi'
import { useSafeQuery, type UseSafeQueryArgs } from './useSafeQuery'
import { keysfn } from './epFn'

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
  const res = await redaxios[mut.type](mut.path, mut.payload)
  return spec.parse(res.data)
}

export const simpleQueryState = <
  Path extends PathBase,
  QuerySpec extends z.ZodTypeAny,
  Hs extends Handlers,
>(
  path: Path,
  queryOptions: UseSafeQueryArgs<QuerySpec>,
  mutationHandlers: Hs,
) => {
  let invalidateKey: string[]
  const useQuery = (
    params: Params<Path>,
    moreQueryOptions: Partial<UseSafeQueryArgs<QuerySpec>>,
  ) => {
    invalidateKey = keysfn(path, params)
    return useSafeQuery({
      ...queryOptions,
      ...moreQueryOptions,
      paths: invalidateKey,
    })
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
      onSettled: () => qc.invalidateQueries(invalidateKey),
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
