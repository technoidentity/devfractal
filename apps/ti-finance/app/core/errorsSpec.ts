import type { FormErrors } from '@srtp/remix-core'
import { z } from 'zod'

export function createErrorsSpec<Spec extends z.AnyZodObject>(
  obj: Spec,
): z.ZodSchema<FormErrors<z.infer<Spec>>> {
  const keys = obj.keyof()
  const errors = z.object({
    fieldErrors: z.record(keys, z.string()).optional(),
    formError: z.string().optional(),
  })
  // this can be dangerous as type and runtime errors can be different
  return errors as any
}
