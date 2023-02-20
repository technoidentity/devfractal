import { Billable } from '@prisma/client'
import { CreateMappingSpec } from '~/common'
import type { CreateProps } from '../common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateMappingSpec = {
  tiId: '',
  departmentId: -1111,
  ctc: 0,
  category: Billable.billable,
  fromDate: new Date(),
  toDate: new Date(),
}

export const CreateDepartmentForm = (
  serverErrors: CreateProps<CreateMappingSpec>,
) => {
  return (
    <CreateForm
      spec={CreateMappingSpec}
      serverErrors={serverErrors}
      title="Create Department Mapping"
      FormFields={FormFields}
      initialValues={initialValues}
    />
  )
}
