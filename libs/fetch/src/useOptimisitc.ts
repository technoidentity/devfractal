import type {
  MutationFunction,
  UseMutationOptions,
} from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export type MutationOptions<TData, TVariables, TQueryData = TData[]> = Omit<
  UseMutationOptions<TData, Error, TVariables, { previous: TQueryData }>,
  'mutationFn'
>

export function useOptimistic<TData, TVariables, TQueryData>(
  invalidateQuery: any[],
  mutationFn: MutationFunction<TData, TVariables>,
  setData: (old: TQueryData, newValue: TData) => TQueryData,
  options?: MutationOptions<TData, TVariables, TQueryData>,
) {
  const qc = useQueryClient()

  const onMutate = async (
    values: TVariables,
  ): Promise<{ previous: TQueryData } | undefined> => {
    await qc.cancelQueries(invalidateQuery)

    const previous: TQueryData | undefined = qc.getQueryData(invalidateQuery)

    qc.setQueryData(invalidateQuery, (old: any) => setData(old, values as any))

    return previous ? { previous } : undefined
  }

  const onSettled = async () => {
    await qc.invalidateQueries(invalidateQuery)
  }

  const error = (
    _err: Error,
    context: { previous: TQueryData } | undefined,
  ) => {
    qc.setQueryData(invalidateQuery, context?.previous)
  }

  const mutation = useMutation({
    mutationFn,
    onMutate,
    onError: (err, _, context) => error(err, context),
    onSuccess: onSettled,
    ...options,
  } satisfies UseMutationOptions<TData, Error, TVariables, { previous: TQueryData }>)

  return [mutation.mutate, mutation] as const
}
