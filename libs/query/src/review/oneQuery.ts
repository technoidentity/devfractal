import type { MutationFunction } from '@tanstack/react-query'

import type { UseOptimisticMutationOptions } from '../core/useOptimistic'
import { useOptimisticValue } from '../core/useOptimistic'

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
