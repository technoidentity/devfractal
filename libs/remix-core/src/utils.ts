import type { z } from 'zod'

export type FieldErrors<T extends object> = Record<keyof T, string>

export type Errors<T extends object> = Readonly<{
  fieldErrors?: FieldErrors<T>
  error?: string
}>

export async function fromFormData<Output, Input>(
  spec: z.ZodType<Output, z.ZodTypeDef, Input>,
  request: Request,
) {
  const values = Object.fromEntries(await request.formData())
  return spec.safeParse(values)
}

export const formErrors = <T extends object>(
  error: z.ZodError<T>,
): FieldErrors<T> => {
  const results: any = {}
  error.errors.forEach(error => {
    results[error.path.join('.')] = error.message
  })
  return results
}
