import type { z } from 'zod'

import { formatErrors } from './formatErrors'
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
      `Errors: ${formatted}\n\nValue: ${objectStr}\n\nZod Error: ${zodError.message}\n\nSchema: ${specStr}`,
    )

    this.name = 'CastError'
  }

  get errors() {
    return formatErrors(this.zodError)
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

export function parse<Output, Input>(
  spec: z.ZodType<Output, z.ZodTypeDef, Input>,
  v: unknown,
): z.SafeParseReturnType<Input, Output> {
  return spec.safeParse(v)
}

export function pcast<Spec extends z.ZodTypeAny>(spec: Spec) {
  return function castFn(v: unknown): z.infer<Spec> {
    return cast(spec, v)
  }
}

export function pparse<Output, Input>(
  spec: z.ZodType<Output, z.ZodTypeDef, Input>,
) {
  return function pparseFn(v: unknown): z.SafeParseReturnType<Input, Output> {
    return parse(spec, v)
  }
}

export function ensure<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): asserts v is z.infer<Spec> {
  cast(spec, v)
}

export function devCast<Spec extends z.ZodTypeAny>(
  spec: Spec,
  v: unknown,
): z.infer<Spec> {
  if (process.env.NODE_ENV === 'development') {
    return cast(spec, v)
  }
  return v
}
