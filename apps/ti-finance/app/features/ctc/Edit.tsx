import { CtcSpec } from '~/common'
import type { EditProps } from '~/core'
import { EditForm } from '~/core'
import { FormFields } from './FormFields'

export const EditCtcForm = ({
  initialValues,
  serverErrors,
}: EditProps<CtcSpec>) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit CTC!"
      initialValues={initialValues}
      spec={CtcSpec}
    />
  )
}
