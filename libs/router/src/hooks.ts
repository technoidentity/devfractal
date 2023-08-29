/* eslint-disable react-hooks/exhaustive-deps */

import { linkfn, type Params, type PathBase } from '@srtp/core'
import { cast } from '@srtp/core'
import { useEvent } from '@srtp/react'
import { toSearch } from '@srtp/web'
import React from 'react'
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useParams as useReactRouterParams,
  useSearchParams,
} from 'react-router-dom'
import type { z } from 'zod'

export function safeNavigate<Path extends PathBase>(path: Path) {
  return function useSafeNavigate() {
    const navigate = useNavigate()

    return useEvent((values: Params<Path>) => navigate(linkfn(path)(values)))
  }
}

export type UseSearchResult<Spec extends z.ZodTypeAny> = readonly [
  z.infer<Spec> | undefined,
  (values: z.infer<Spec>) => void,
]

export function safeSearch<Spec extends z.ZodTypeAny>(spec: Spec) {
  return function useSearch(): UseSearchResult<Spec> {
    const [search, set] = useSearchParams()

    const setSearch = useEvent((values: z.infer<Spec>) =>
      set(toSearch(cast(spec, values))),
    )

    const searchValue = React.useMemo(() => {
      const result = spec.safeParse(Object.fromEntries(search))
      // @TODO: throw or return result instead of undefined?
      return result.success ? (result.data as z.infer<Spec>) : undefined
    }, [search])

    console.log({ searchValue })
    return [searchValue, setSearch] as const
  }
}

export function useSafeSearch<Spec extends z.ZodTypeAny>(spec: Spec) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useSearch = React.useMemo(() => safeSearch(spec), [])
  return useSearch()
}

export function safeParams<Spec extends z.ZodTypeAny>(
  spec: Spec,
): () => z.infer<Spec> {
  return function useParams() {
    const params: unknown = useReactRouterParams()
    return cast(spec, params)
  }
}

export function useSafeParams<Spec extends z.ZodTypeAny>(spec: Spec) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const useParams = React.useMemo(() => safeParams(spec), [])
  return useParams()
}

export function safeLoaderData<Spec extends z.ZodTypeAny>(
  spec: Spec,
): () => z.infer<Spec> {
  return () => cast(spec, useLoaderData())
}

export function safeActionData<Spec extends z.ZodTypeAny>(
  spec: Spec,
): () => z.infer<Spec> {
  return () => cast(spec, useActionData())
}

export function useSafeLoaderData<Spec extends z.ZodTypeAny>(spec: Spec) {
  const useHook = React.useMemo(() => safeLoaderData(spec), [])
  return useHook()
}

export function useSafeActionData<Spec extends z.ZodTypeAny>(spec: Spec) {
  const useHook = React.useMemo(() => safeActionData(spec), [])
  return useHook()
}
