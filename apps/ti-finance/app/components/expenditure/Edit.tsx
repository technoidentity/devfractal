import type { Errors } from '@srtp/remix-core'
import { ExpenditureSchema } from '~/common/validators'
import { EditForm } from '../common/EditForm'
import { FormFields } from './FormFields'

export type EditExpenditureFormProps = Readonly<{
  initialValues: ExpenditureSchema
  serverErrors?: Errors<ExpenditureSchema>
}>

export const EditExpenditureForm = ({
  initialValues,
  serverErrors,
}: EditExpenditureFormProps) => {
  return (
    <EditForm
      spec={ExpenditureSchema}
      FormFields={FormFields}
      title="Modify Department Expenditure!"
      initialValues={initialValues}
      serverErrors={serverErrors}
    />
  )
}
