import type { z } from 'zod'

export type FieldErrors<T extends object> = Record<keyof T, string>

// @TODO: remove duplicate formErrors
export const formatErrors = <T extends object>(
  error: z.ZodError<T>,
): FieldErrors<T> => {
  const results: any = {}
  for (const e of error.errors) {
    results[e.path.join('.')] = e.message
  }
  return results
}
