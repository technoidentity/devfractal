import { CreateAccessSpec } from '~/common'
import type { EditProps } from '~/core'
import { EditForm } from '~/core'
import { FormFields } from './FormFields'

export const EditAccessForm = ({
  initialValues,
  serverErrors,
}: EditProps<CreateAccessSpec>) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit CTC!"
      initialValues={initialValues}
      spec={CreateAccessSpec}
    />
  )
}
