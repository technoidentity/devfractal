import redaxios from 'redaxios'

import type { Draft } from 'immer'
import { produce } from 'immer'
import { useOptimistic } from './useOptimisitc'

// import type { Draft } from 'immer'
// import { z } from 'zod'
// import { useSafeQuery, type UseSafeQueryArgs } from '@srtp/fetch'

// export type Mutations<State> = Record<
//   string,
//   (state: Draft<State>, payload: any) => void
// >

// export function mutations<
//   Spec extends z.ZodTypeAny,
//   Hs extends Mutations<z.infer<Spec>>,
// >(queryOptions: UseSafeQueryArgs<Spec>, handlers: Hs) {
//   return {
//     useQuery: () => useSafeQuery(queryOptions),
//   }
// }

type Method = 'post' | 'patch' | 'put' | 'delete'

type MutationDescription<T> = {
  type: Method
  path: string
  payload: T
}

export async function mutation<T>(mut: MutationDescription<T>) {
  const res = await redaxios[mut.type](mut.path, mut.payload)
  return res.data
}

export function useImmerOptimistic<TData, TVariables, TQueryData>(
  invalidateQuery: any[],
  fn: (old: Draft<TQueryData>, arg: TVariables) => MutationDescription<TData>,
) {
  let result: MutationDescription<TData>

  const setData = (old: any, values: any) =>
    produce(old, (draft: any) => {
      result = fn(draft, values)
    })

  const mutationFn = () => mutation(result)

  return useOptimistic(invalidateQuery, mutationFn, setData)
}
