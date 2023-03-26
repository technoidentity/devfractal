import type { FormErrors } from '@srtp/remix-core'

export type CreateProps<T extends object> = FormErrors<T>

export type EditProps<T extends object> = Readonly<{
  initialValues: T
  serverErrors?: FormErrors<T>
}>
