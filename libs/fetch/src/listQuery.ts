import type { MutationFunction } from '@tanstack/react-query'
import type { MutationOptions } from './useOptimisitc'
import { useOptimistic } from './useOptimisitc'

let dummyID = -1
export function usePost<TData extends { id: unknown }, TVariables>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TVariables>,
) {
  return useOptimistic(
    invalidateQuery,
    mutationFn,
    (old, newValue) => [...old, { id: --dummyID, ...(newValue as any) }],
    options,
  )
}

export function usePatch<TData extends { id: unknown }, TVariables>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TVariables>,
) {
  return useOptimistic(
    invalidateQuery,
    mutationFn,
    (old, newValue) => old.map(t => (t.id === newValue.id ? newValue : t)),
    options,
  )
}

// @TODO: Unfortunately, currently delete mutationFn must return back the deleted item.
export function useDelete<TData extends { id: unknown }, TVariables>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TVariables, TVariables>,
  options?: MutationOptions<TVariables, TVariables, TData[]>,
) {
  return useOptimistic(
    invalidateQuery,
    mutationFn,
    (old, id) => old.filter(t => t.id !== id),
    options,
  )
}
