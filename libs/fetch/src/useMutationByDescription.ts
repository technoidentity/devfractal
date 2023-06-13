import redaxios from 'redaxios'

import type { Draft } from 'immer'
import { produce } from 'immer'
import { useOptimistic } from './useOptimisitc'
import React from 'react'
import invariant from 'tiny-invariant'

export type Method = 'post' | 'patch' | 'put' | 'delete'

export type MutationDescription<T> = {
  type: Method
  path: string
  payload: T
}

export const mutationApi = {
  post: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'post',
    path,
    payload,
  }),
  patch: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'patch',
    path,
    payload,
  }),
  put: <T>(path: string, payload: T): MutationDescription<T> => ({
    type: 'put',
    path,
    payload,
  }),
  remove: (path: string): MutationDescription<undefined> => ({
    type: 'delete',
    path,
    payload: undefined,
  }),
}

export async function mutation<T>(mut: MutationDescription<T>) {
  const res = await redaxios[mut.type](mut.path, mut.payload)
  return res.data
}

export type MutationAction<TData, TQueryData, TVariables> = (
  old: Draft<TQueryData>,
  api: typeof mutationApi,
  arg: TVariables,
) => MutationDescription<TData>

export function useMutationByDescription<TData, TQueryData, TVariables>(
  invalidateQuery: any[],
  fn: MutationAction<TData, TQueryData, TVariables>,
) {
  const result = React.useRef<MutationDescription<TData>>()

  const setData = (old: any, values: any): any =>
    produce(old, (draft: any) => {
      result.current = fn(draft, mutationApi, values)
    })

  const mutationFn = () => {
    invariant(result.current, 'mutation description is undefined')
    return mutation(result.current)
  }

  return useOptimistic<TData, TQueryData, TVariables>(
    invalidateQuery,
    mutationFn,
    setData,
  )
}
