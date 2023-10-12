import type { Params, PathBase } from '@srtp/core'
import { cast, keysfn } from '@srtp/core'
import { axios } from '@srtp/web'
import {
  useQueryClient,
  useMutation as useTanstackMutation,
  type MutationFunction,
  type UseMutationOptions,
} from '@tanstack/react-query'
import type { Schema, z } from 'zod'

import { useSimpleQuery, type UseSimpleQueryArgs } from '../core'

import { ApiDescriptions, type MutationDescription } from './mutationApi'

export type MutationHandler = (
  api: typeof ApiDescriptions,
  variables: any,
) => MutationDescription<any>

export type SafeQueryHandlers = Record<
  string,
  [response: z.ZodTypeAny, action: MutationHandler]
>

export type SafeQueryActions<Hs extends SafeQueryHandlers> = {
  [Key in keyof Hs as `use${Capitalize<Key & string>}`]: <TContext>(
    options?: UseMutationOptions<
      z.infer<Hs[Key][0]>,
      Error,
      Parameters<Hs[Key][1]>[1],
      TContext
    >,
  ) => readonly [
    (variables: Parameters<Hs[Key][1]>[1]) => Promise<void>,
    ReturnType<
      typeof useTanstackMutation<
        z.infer<Hs[Key][0]>,
        Error,
        Parameters<Hs[Key][1]>[1],
        TContext
      >
    >,
  ]
}

async function apiMethod<T>(
  { method: type, path, request: payload }: MutationDescription<T>,
  spec: Schema<T>,
): Promise<T> {
  const { data } = await axios({ method: type, url: path, body: payload })

  return cast(spec, data)
}

type QueryStateArgs<
  Path extends PathBase,
  QuerySpec extends z.ZodTypeAny,
  TQueryFnData,
  Hs extends SafeQueryHandlers,
> = {
  path: Path
  queryOptions: Omit<UseSimpleQueryArgs<QuerySpec, TQueryFnData>, 'paths'>
  mutationHandlers: Hs
}
export const queryState = <
  Path extends PathBase,
  QuerySpec extends z.ZodTypeAny,
  TQueryFnData,
  Hs extends SafeQueryHandlers,
>({
  path,
  queryOptions,
  mutationHandlers,
}: QueryStateArgs<Path, QuerySpec, TQueryFnData, Hs>) => {
  let invalidateKey: string[]

  const useQuery = (
    options: { params: Params<Path> } & Partial<
      UseSimpleQueryArgs<QuerySpec, TQueryFnData>
    >,
  ) => {
    invalidateKey = keysfn(path, options.params)
    return useSimpleQuery({
      ...queryOptions,
      ...options,
      paths: invalidateKey,
    })
  }

  const action = <Key extends keyof Hs>(key: Key) => {
    type TData = z.infer<Hs[Key][0]>
    type TVariables = Parameters<Hs[Key][1]>[1]

    return function useMutation<TContext>(
      options?: UseMutationOptions<TData, Error, TVariables, TContext>,
    ) {
      const qc = useQueryClient()
      const spec = mutationHandlers[key][0]
      const fn = mutationHandlers[key][1]

      const mutationFn: MutationFunction<TData, TVariables> = variables =>
        apiMethod(fn(ApiDescriptions, variables), spec)

      const mutate = useTanstackMutation({
        ...options,
        mutationFn,
        onSettled: (...args) => {
          qc.invalidateQueries(invalidateKey).catch(console.error)
          if (options?.onSettled) {
            options.onSettled(...args)
          }
        },
      })

      return [mutate.mutate, mutate] as const
    }
  }

  const actions: SafeQueryActions<Hs> = Object.keys(mutationHandlers).reduce(
    (acc, key) => {
      acc[key] = action(key)
      return acc
    },
    {} as any,
  )

  return [useQuery, actions] as const
}

// const [useTestQuery, actions] = queryState({
//   path: ['test', { id: z.number() }],

//   queryOptions: { spec: z.any(), queryFn: () => Promise.resolve({}) },

//   mutationHandlers: {
//     test: [
//       z.number(),
//       (api, variables: number) => api.post('/test', variables),
//     ],

//     test2: [
//       z.string(),
//       (api, variables: string) => api.post('/test2', variables),
//     ],
//   },
// })
