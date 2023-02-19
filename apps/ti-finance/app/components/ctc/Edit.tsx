import type { Errors } from '@srtp/remix-core'
import { CtcSchema } from '~/common/validators'
import { EditForm } from '../common/EditForm'
import { FormFields } from './FormFields'

export type EditCtcFormProps = Readonly<{
  initialValues: CtcSchema
  serverErrors?: Errors<CtcSchema>
}>

export const EditCtcForm = ({
  initialValues,
  serverErrors,
}: EditCtcFormProps) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit CTC"
      initialValues={initialValues}
      spec={CtcSchema}
    />
  )
}
