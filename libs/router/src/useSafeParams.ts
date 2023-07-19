import { cast } from '@srtp/spec'
import React from 'react'
import type { z } from 'zod'
import { useParams as useReactRouterParams } from 'react-router-dom'

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
