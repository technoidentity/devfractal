import {
  useMutation as useTanstackMutation,
  type MutationFunction,
  useQueryClient,
} from '@tanstack/react-query'
import redaxios from 'redaxios'
import type { Schema } from 'zod'
import type { z } from 'zod'
import { ApiDescriptions, type MutationDescription } from './mutationApi'
import { useSafeQuery, type UseSafeQueryArgs } from './useSafeQuery'

export type MutationHandler = (
  api: typeof ApiDescriptions,
  variables: any,
) => MutationDescription<any>

export type Handlers = Record<string, [spec: z.ZodTypeAny, fn: MutationHandler]>

async function apiMethod<T>(
  mut: MutationDescription<T>,
  spec: Schema<T>,
): Promise<T> {
  const res = await redaxios[mut.type](mut.path, mut.payload)
  return spec.parse(res.data)
}

export const queryState = <QuerySpec extends z.ZodTypeAny, Hs extends Handlers>(
  queryOptions: UseSafeQueryArgs<QuerySpec>,
  mutationHandlers: Hs,
) => {
  const useQuery = () => {
    return useSafeQuery(queryOptions)
  }

  const useMutation = <Key extends keyof Hs>(key: Key) => {
    const qc = useQueryClient()
    const fn = mutationHandlers[key][1]
    const spec = mutationHandlers[key][0]

    type TData = z.infer<Hs[Key][0]>
    type TVariables = Parameters<Hs[Key][1]>[1]

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

// const [useTestQuery, useTestMutation] = queryState(
//   { spec: z.any(), paths: [''], queryFn: () => Promise.resolve({}) },
//   {
//     test: [
//       z.number(),
//       (api, variables: number) => api.post('/test', variables),
//     ],
//     test2: [
//       z.string(),
//       (api, variables: string) => api.post('/test2', variables),
//     ],
//   },
// )
