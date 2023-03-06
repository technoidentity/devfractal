import { Paper } from '@mantine/core'
import type { InputsType } from '@srtp/remix-react'
import type { FormSpec } from '@srtp/validator'
import type { CrudFormProps } from './CrudForm'
import { CrudForm } from './CrudForm'

export type FormFieldsProps<Spec extends FormSpec> = Readonly<{
  Inputs: InputsType<Spec>
}>

export interface CreateFormProps<Spec extends FormSpec>
  extends Omit<CrudFormProps<Spec>, 'children' | 'method'> {
  FormFields: (props: FormFieldsProps<Spec>) => JSX.Element
}

export function CreateForm<Spec extends FormSpec>({
  spec,
  serverErrors,
  initialValues,
  title,
  onSubmit,
  FormFields,
}: CreateFormProps<Spec>) {
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <CrudForm
        method="post"
        spec={spec}
        title={title}
        initialValues={initialValues}
        onSubmit={onSubmit}
        serverErrors={serverErrors}
      >
        {FormFields}
      </CrudForm>
    </Paper>
  )
}
