import type { Errors } from '@srtp/remix-core'

export type CreateProps<T extends object> = Errors<T>

export type EditProps<T extends object> = Readonly<{
  initialValues: T
  serverErrors?: Errors<T>
}>
