import {
  useQueryClient,
  useMutation as useTanstackMutation,
  useQuery as useTanstackQuery,
  type MutationFunction,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query'
import type { Params, PathBase } from './endpoint'
import { keysfn } from './epFn'

export type Handlers = Record<string, MutationFunction<any, any>>

export type Actions<Hs extends Handlers> = {
  [Key in keyof Hs as `use${Capitalize<Key & string>}`]: <TContext>(
    options?: UseMutationOptions<
      Awaited<ReturnType<Hs[Key]>>,
      Error,
      Parameters<Hs[Key]>[0],
      TContext
    >,
  ) => readonly [
    (variables: Parameters<Hs[Key]>[0]) => Promise<void>,
    ReturnType<
      typeof useTanstackMutation<
        ReturnType<Hs[Key]>,
        Error,
        Parameters<Hs[Key]>[0],
        TContext
      >
    >,
  ]
}

export const queryState = <Path extends PathBase, Hs extends Handlers>(
  path: Path,
  queryOptions: Omit<UseQueryOptions, 'queryKey'>,
  mutationHandlers: Hs,
) => {
  let invalidateKey: QueryKey

  const useQuery = (
    options: { params: Params<Path> } & Partial<typeof queryOptions>,
  ) => {
    invalidateKey = keysfn(path, options.params)
    return useTanstackQuery({
      queryKey: invalidateKey,
      ...queryOptions,
      ...options,
    })
  }

  const action = <Key extends keyof Hs>(key: Key) => {
    type TData = ReturnType<Hs[Key]>
    type TVariables = Parameters<Hs[Key]>[0]
    type MutationFn = MutationFunction<TData, TVariables>

    return function useMutation<TContext>(
      options?: UseMutationOptions<TData, Error, TVariables, TContext>,
    ) {
      const qc = useQueryClient()

      const mutate = useTanstackMutation({
        ...options,

        mutationFn: mutationHandlers[key] as MutationFn,

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

  const actions: Actions<Hs> = Object.keys(mutationHandlers).reduce(
    (acc, key) => {
      acc[key] = action(key)
      return acc
    },
    {} as any,
  )

  return [useQuery, actions] as const
}

// const api = createApi()
// const [useTestQuery, actions] = simpleQueryState(
//   ['test', { id: z.number() }],
//   { queryFn: () => Promise.resolve({}) },
//   {
//     test: (variables: number) => api.post('/test', { variables }),
//     test2: (variables: string) => api.post('/test2', { variables }),
//   },
// )
