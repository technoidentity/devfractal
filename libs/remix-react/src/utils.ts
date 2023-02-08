import type { UseFormReturnType } from '@mantine/form'
import type { Errors } from '@srtp/remix-core'

// @TODO: to .client.ts?
export function getFieldError<T extends object>(
  errors: Errors<T> | undefined,
  form: UseFormReturnType<T, (values: T) => T>,
) {
  return (key: keyof T) => {
    return errors?.fieldErrors?.[key] || form.getInputProps(key).error
  }
}
