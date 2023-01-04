import { TypeOf, ZodTypeAny } from 'zod'

export function cast<Spec extends ZodTypeAny>(
  spec: Spec,
  v: unknown,
): TypeOf<Spec> {
  return spec.parse(v)
}

export function ensure<Spec extends ZodTypeAny>(
  spec: Spec,
  v: unknown,
): asserts v is TypeOf<Spec> {
  spec.parse(v)
}

export function is<Spec extends ZodTypeAny>(
  spec: Spec,
  v: unknown,
): v is TypeOf<Spec> {
  return spec.safeParse(v).success
}

export function debugCast<Spec extends ZodTypeAny>(
  spec: Spec,
  v: unknown,
): TypeOf<Spec> {
  if (process.env.NODE_ENV === 'development') {
    return spec.parse(v)
  }
  return v
}
