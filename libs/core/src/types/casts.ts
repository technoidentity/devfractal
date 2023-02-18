import type { z } from 'zod'

export function cast<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  return spec.parse(v)
}

export function ensure<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): asserts v is z.infer<Spec> {
  spec.parse(v)
}

export function is<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): v is z.infer<Spec> {
  return spec.safeParse(v).success
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
