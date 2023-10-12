import type { MutationFunction } from '@tanstack/react-query'
import type { z } from 'zod'

import { useSafeMutation, type UseOptimisticMutationOptions } from '../core'

export function useOnePatch<
  Spec extends z.ZodTypeAny,
  TVariables extends Partial<z.infer<Spec>>,
>(
  spec: Spec,
  mutationFn: MutationFunction<z.infer<Spec>, TVariables>,
  options?: UseOptimisticMutationOptions<z.infer<Spec>, TVariables>,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, newValue) => ({ ...old, ...newValue }),
    ...options,
  })
}
