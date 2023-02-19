import { ExpenditureSchema } from '~/common'
import type { EditProps } from '../common'
import { EditForm } from '../common'
import { FormFields } from './FormFields'

export type EditExpenditureFormProps = EditProps<ExpenditureSchema>

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
