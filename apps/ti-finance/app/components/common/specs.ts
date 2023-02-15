import type { Errors } from '@srtp/remix-core'
import { z } from 'zod'

export function createErrorsSpec<Spec extends z.AnyZodObject>(
  obj: Spec,
): z.ZodSchema<Errors<z.infer<Spec>>> {
  const keys = obj.keyof()
  const errors = z.object({
    fieldErrors: z.record(keys, z.string()).optional(),
    error: z.string().optional(),
  })
  return errors as any
}

export function listLoaderSpec<Spec extends z.AnyZodObject>(spec: Spec) {
  return z.object({ data: z.array(spec) })
}
