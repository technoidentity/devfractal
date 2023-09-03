import type {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { z } from 'zod'

import { useSafeMutation, type UseOptimisticMutationOptions } from '../core'

type IDType = { id: any }
export type PostMutationValue<T extends IDType> = Omit<T, 'id'>
export type PatchMutationValue<T extends IDType> = Pick<T, 'id'> &
  Partial<Omit<T, 'id'>>

type Options<TData, TVariables> = Omit<
  UseMutationOptions<TData, Error, TVariables, { previous: TData[] }>,
  'mutationFn'
>

let dummyID = -1
export function usePost<Spec extends z.ZodTypeAny>(
  spec: Spec,
  invalidateKey: QueryKey,
  mutationFn: MutationFunction<z.infer<Spec>, PostMutationValue<z.infer<Spec>>>,
  options?: Options<z.infer<Spec>, Omit<z.infer<Spec>, 'id'>>,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, newValue) => [
      ...old,
      { id: --dummyID, ...(newValue as any) },
    ],

    invalidateKey,
    ...options,
  })
}

export function usePatch<Spec extends z.ZodTypeAny>(
  spec: Spec,
  invalidateKey: QueryKey,
  mutationFn: MutationFunction<
    z.infer<Spec>,
    PatchMutationValue<z.infer<Spec>>
  >,
  options?: Options<z.infer<Spec>, PatchMutationValue<z.infer<Spec>>>,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, newValue) =>
      old.map(t => (t.id === newValue.id ? { ...t, ...newValue } : t)),

    invalidateKey,
    ...options,
  })
}

export function usePut<Spec extends z.ZodTypeAny>(
  spec: Spec,
  invalidateKey: QueryKey,
  mutationFn: MutationFunction<z.infer<Spec>, z.infer<Spec>>,
  options?: Options<z.infer<Spec>, z.infer<Spec>>,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, newValue) =>
      old.map(t => (t.id === newValue.id ? newValue : t)),

    invalidateKey,
    ...options,
  })
}

export function useDelete<Spec extends z.ZodTypeAny, TVariables>(
  spec: Spec,
  invalidateKey: any[],
  mutationFn: MutationFunction<z.infer<Spec>, TVariables>,
  options?: Omit<
    UseOptimisticMutationOptions<TVariables, TVariables, z.infer<Spec>[]>,
    'setData'
  >,
) {
  return useSafeMutation(spec, mutationFn, {
    setData: (old, id) => old.filter(t => t.id !== id),

    invalidateKey,
    ...options,
  })
}
