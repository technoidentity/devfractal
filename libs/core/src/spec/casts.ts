import type { z } from 'zod'

import { formatErrors } from './formatError'
import { jstr } from './typeCasts'

export class CastError extends Error {
  constructor(
    readonly spec: z.ZodTypeAny,
    readonly object: unknown,
    readonly zodError: z.ZodError,
  ) {
    const formatted = jstr(formatErrors(zodError))
    const specStr = jstr(spec)
    const objectStr = jstr(object)
    super(
      `${zodError.message}\n\nformattedError: ${formatted}\n\nvalue: ${objectStr}\n\nspec: ${specStr}`,
    )

    this.name = 'CastError'
  }
}
export function cast<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  if (process.env.NODE_ENV === 'development') {
    const result = spec.safeParse(v)
    if (result.success) {
      return result.data
    }

    throw new CastError(spec, v, result.error)
  }

  return spec.parse(v)
}

export function ensure<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): asserts v is z.infer<Spec> {
  cast(spec, v)
}

export function debugCast<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  if (process.env.NODE_ENV === 'development') {
    return cast(spec, v)
  }
  return v
}
