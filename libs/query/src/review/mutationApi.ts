import type { HttpMethod } from '@srtp/core'
import { axios, type AxiosFn } from '@srtp/web'
import { produce, type Draft } from 'immer'
import React from 'react'
import invariant from 'tiny-invariant'
import type { z } from 'zod'

import {
  useSafeMutation,
  type UseOptimisticMutationOptions,
  useAxios,
} from '../core'

export type MutationDescription<T> = {
  method: HttpMethod
  path: string
  request: T
}

export const ApiDescriptions = {
  post: <T>(path: string, payload: T): MutationDescription<T> => ({
    method: 'post',
    path,
    request: payload,
  }),

  patch: <T>(path: string, payload: T): MutationDescription<T> => ({
    method: 'patch',
    path,
    request: payload,
  }),

  put: <T>(path: string, payload: T): MutationDescription<T> => ({
    method: 'put',
    path,
    request: payload,
  }),

  remove: (path: string): MutationDescription<undefined> => ({
    method: 'delete',
    path,
    request: undefined,
  }),
}

function createDefaultMutation(axiosFn: AxiosFn = axios) {
  return async function defaultMutation<T>(mut: MutationDescription<T>) {
    const [data] = await axiosFn({
      url: mut.path,
      method: mut.method,
      body: mut.request,
    })
    return data
  }
}

export type MutationAction<TData, TVariables, TQueryData> = (
  old: Draft<TQueryData>,
  api: typeof ApiDescriptions,
  arg: TVariables,
) => MutationDescription<TData>

export type UseDescribeMutationOptions<TData, TVariables, TQueryData> =
  UseOptimisticMutationOptions<TData, TVariables, TQueryData> & {
    mutation: (mut: MutationDescription<TData>) => Promise<TData>
  }

export function useDescribeMutation<
  Spec extends z.ZodTypeAny,
  TVariables,
  TQueryData,
>(
  spec: Spec,
  fn: MutationAction<z.infer<Spec>, TVariables, TQueryData>,
  options?: UseDescribeMutationOptions<z.infer<Spec>, TVariables, TQueryData>,
) {
  const result = React.useRef<MutationDescription<z.infer<Spec>>>()
  const { axios } = useAxios()

  const setData = (old: any, values: any): any =>
    produce(old, (draft: any) => {
      result.current = fn(draft, ApiDescriptions, values)
    })

  const mutation = options?.mutation ?? createDefaultMutation(axios)

  const mutationFn = () => {
    invariant(result.current, 'mutation description is undefined')
    return mutation(result.current) as any
  }

  return useSafeMutation<z.infer<Spec>, TVariables, TQueryData>(
    spec,
    mutationFn,
    { setData, ...options },
  )
}
