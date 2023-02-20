import { MappingSpec } from '~/common'
import type { EditProps } from '../common'
import { EditForm } from '../common'
import { FormFields } from './FormFields'

export const EditDepartmentForm = ({
  initialValues,
  serverErrors,
}: EditProps<MappingSpec>) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit Department"
      initialValues={initialValues}
      spec={MappingSpec}
    />
  )
}
