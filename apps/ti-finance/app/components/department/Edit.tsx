import type { Errors } from '@srtp/remix-core'
import { DepartmentMappingSchema } from '~/common/validators'
import { EditForm } from '../common/EditForm'
import { FormFields } from './FormFields'

export type EditDepartmentFormProps = Readonly<{
  department: DepartmentMappingSchema
  serverErrors?: Errors<DepartmentMappingSchema>
}>

export const EditDepartmentForm = ({
  department,
  serverErrors,
}: EditDepartmentFormProps) => {
  return (
    <EditForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Edit Department"
      initialValues={department}
      spec={DepartmentMappingSchema}
    />
  )
}
