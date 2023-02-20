import { ExpenditureSpec } from '~/common'
import type { EditProps } from '../common'
import { EditForm } from '../common'
import { FormFields } from './FormFields'

export type EditExpenditureFormProps = EditProps<ExpenditureSpec>

export const EditExpenditureForm = ({
  initialValues,
  serverErrors,
}: EditExpenditureFormProps) => {
  return (
    <EditForm
      spec={ExpenditureSpec}
      FormFields={FormFields}
      title="Modify Department Expenditure!"
      initialValues={initialValues}
      serverErrors={serverErrors}
    />
  )
}
