import type { MutationFunction } from '@tanstack/react-query'
import type { MutationOptions } from './useOptimisitc'
import { useOptimisticValue } from './useOptimisitc'

export function useOnePatch<
  TData extends { id: unknown },
  TVariables extends Partial<TData>,
>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  options?: MutationOptions<TData, TVariables>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, newValue) => ({ ...old, ...newValue }),
    options,
  )
}
