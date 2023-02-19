import type { Errors } from '@srtp/remix-core'
import type { FormSchema } from '@srtp/validator'

export * from './Create'
export * from './Delete'
export * from './Edit'

export type CreateProps<Spec extends FormSchema> = Errors<Spec>
export type EditProps<Spec extends FormSchema> = Readonly<{
  initialValues: Spec
  serverErrors?: Errors<Spec>
}>
