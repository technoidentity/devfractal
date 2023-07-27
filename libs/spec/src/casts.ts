import type { z } from 'zod'

export class CastError extends Error {
  constructor(
    readonly spec: z.ZodTypeAny,
    readonly object: unknown,
    readonly zodError: z.ZodError,
  ) {
    super(
      `${zodError.message}\n\n value: ${JSON.stringify(
        object,
        null,
        2,
      )}\n\n spec: ${JSON.stringify(spec, null, 2)}`,
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
  spec.parse(v)
}

export function debugCast<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  if (process.env.NODE_ENV === 'development') {
    return spec.parse(v)
  }
  return v
}
