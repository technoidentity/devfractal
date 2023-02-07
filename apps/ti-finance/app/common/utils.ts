import type { UseFormReturnType } from '@mantine/form'
import { json } from '@remix-run/node'
import type { ZodError, ZodType, ZodTypeDef } from 'zod'

export type FieldErrors<T extends object> = Record<keyof T, string>

export type Errors<T extends object> = Readonly<{
  fieldErrors?: FieldErrors<T>
  error?: string | undefined
}>

export const badRequest = <T extends object>(data: Errors<T>) =>
  json(data, { status: 400 })

// @TODO: to .client.ts?
export function getFieldError<T extends object>(
  errors: Errors<T> | undefined,
  form: UseFormReturnType<T, (values: T) => T>,
) {
  return (key: keyof T) => {
    return errors?.fieldErrors?.[key] || form.getInputProps(key).error
  }
}

export const formErrors = <T extends object>(
  error: ZodError<T>,
): FieldErrors<T> => {
  const results: any = {}
  error.errors.forEach(error => {
    results[error.path.join('.')] = error.message
  })
  return results
}

export async function fromFormData<Output, Input>(
  spec: ZodType<Output, ZodTypeDef, Input>,
  request: Request,
) {
  const values = Object.fromEntries(await request.formData())
  return spec.safeParse(values)
}
