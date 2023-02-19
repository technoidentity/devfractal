import { DepartmentMappingSchema } from '~/common'
import type { EditProps } from '../common'
import { EditForm } from '../common'
import { FormFields } from './FormFields'

export const EditDepartmentForm = ({
  initialValues,
  serverErrors,
}: EditProps<DepartmentMappingSchema>) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit Department"
      initialValues={initialValues}
      spec={DepartmentMappingSchema}
    />
  )
}
