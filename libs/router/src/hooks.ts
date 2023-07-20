import { cast } from '@srtp/spec'
import { useLoaderData, useActionData } from 'react-router-dom'
import type { z } from 'zod'

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
