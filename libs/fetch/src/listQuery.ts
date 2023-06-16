import type { MutationFunction } from '@tanstack/react-query'
import type { MutationOptions } from './useOptimisitc'
import { useOptimisticValue } from './useOptimisitc'

let dummyID = -1
export function usePost<TData extends { id: unknown }>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, Omit<TData, 'id'>>,
  options?: MutationOptions<TData, Omit<TData, 'id'>>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, newValue) => [...old, { id: --dummyID, ...(newValue as any) }],
    options,
  )
}

export function usePatch<TData extends { id: unknown }>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, Partial<TData>>,
  options?: MutationOptions<TData, Partial<TData>>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, newValue) =>
      old.map(t => (t.id === newValue.id ? { ...t, ...newValue } : t)),
    options,
  )
}

export function usePut<TData extends { id: unknown }>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TData>,
  options?: MutationOptions<TData, TData>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, newValue) => old.map(t => (t.id === newValue.id ? newValue : t)),
    options,
  )
}

export function useDelete<TData extends { id: unknown }, TVariables>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TVariables, TVariables>,
  options?: MutationOptions<TVariables, TVariables, TData[]>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, id) => old.filter(t => t.id !== id),
    options,
  )
}
