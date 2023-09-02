import type { MutationFunction, QueryKey } from '@tanstack/react-query'
import type { z } from 'zod'

import { useSafeMutation, type UseOptimisticMutationOptions } from '../core'

type Options<TData, TVariables> = Omit<
  UseOptimisticMutationOptions<TVariables, TVariables, TData[]>,
  'setData'
>

let dummyID = -1
export function usePost<Spec extends z.ZodTypeAny>(
  spec: Spec,
  mutationFn: MutationFunction<z.infer<Spec>, Omit<z.infer<Spec>, 'id'>>,
  options?: Options<z.infer<Spec>, Omit<z.infer<Spec>, 'id'>>,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, newValue) => [
      ...old,
      { id: --dummyID, ...(newValue as any) },
    ],
    ...options,
  })
}

export function usePatch<Spec extends z.ZodTypeAny>(
  spec: Spec,
  invalidateQuery: QueryKey,
  mutationFn: MutationFunction<z.infer<Spec>, Partial<z.infer<Spec>>>,
  options?: Options<z.infer<Spec>, Partial<z.infer<Spec>>>,
) {
  return useSafeMutation(spec, mutationFn, {
    invalidateQuery,
    setData: (old, newValue) =>
      old.map(t => (t.id === newValue.id ? { ...t, ...newValue } : t)),
    ...options,
  })
}

export function usePut<Spec extends z.ZodTypeAny>(
  spec: Spec,
  invalidateQuery: QueryKey,
  mutationFn: MutationFunction<z.infer<Spec>, z.infer<Spec>>,
  options?: Options<z.infer<Spec>, z.infer<Spec>>,
) {
  return useSafeMutation(spec, mutationFn, {
    invalidateQuery,
    setData: (old, newValue) =>
      old.map(t => (t.id === newValue.id ? newValue : t)),
    ...options,
  })
}

export function useDelete<Spec extends z.ZodTypeAny, TVariables>(
  spec: Spec,
  invalidateQuery: any[],
  mutationFn: MutationFunction<TVariables, TVariables>,
  options?: Omit<
    UseOptimisticMutationOptions<TVariables, TVariables, z.infer<Spec>[]>,
    'setData'
  >,
) {
  return useSafeMutation(spec, mutationFn, {
    invalidateQuery,
    setData: (old, id) => old.filter(t => t.id !== id),
    ...options,
  })
}
