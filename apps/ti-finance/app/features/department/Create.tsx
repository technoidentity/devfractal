import { CreateAccessSpec } from '~/common'
import type { CreateProps } from '~/core'
import { CreateForm } from '~/core'
import { FormFields } from './FormFields'

const initialValues: CreateAccessSpec = {
  departmentId: -1,
  accessTiIds: [],
}

export const CreateDepartmentAccessForm = (
  serverErrors: CreateProps<CreateAccessSpec>,
) => {
  return (
    <CreateForm
      spec={CreateAccessSpec}
      initialValues={initialValues}
      title="Add Employee Department Access!"
      FormFields={FormFields}
      serverErrors={serverErrors}
    />
  )
}
