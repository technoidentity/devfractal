import type { MutationFunction } from '@tanstack/react-query'

import type { UseOptimisticMutationOptions } from './useOptimistic'
import { useOptimisticValue } from './useOptimistic'

export function useOnePatch<
  TData extends { id: unknown },
  TVariables extends Partial<TData>,
>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseOptimisticMutationOptions<TData, TVariables>,
) {
  return useOptimisticValue(
    invalidateQuery,
    mutationFn,
    (old, newValue) => ({ ...old, ...newValue }),
    options,
  )
}
