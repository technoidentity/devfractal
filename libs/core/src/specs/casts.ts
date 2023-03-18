import type { z } from 'zod'

export function cast<T, Spec extends z.ZodType<T>>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return spec.parse(v)
}

export function ensure<T, Spec extends z.ZodType<T>>(
  spec: Spec,
  v: unknown,
): void {
  spec.parse(v)
}

export function is<T, Spec extends z.ZodType<T>>(
  spec: Spec,
  v: unknown,
): v is z.infer<Spec> {
  return spec.safeParse(v).success
}

export function debugCast<T, Spec extends z.ZodType<T>>(
  spec: Spec,
  v: unknown,
): T {
  if (process.env.NODE_ENV === 'development') {
    return spec.parse(v)
  }
  return v as T
}
