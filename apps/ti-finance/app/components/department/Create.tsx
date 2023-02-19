import { Billable } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'
import { CreateMappingSchema } from './specs'

const initialValues: CreateMappingSchema = {
  tiId: '',
  departmentId: -1111,
  ctc: 0,
  category: Billable.billable,
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

export type CreateDepartmentProps = Errors<CreateMappingSchema>

export const CreateDepartmentForm = (serverErrors: CreateDepartmentProps) => {
  return (
    <CreateForm
      spec={CreateMappingSchema}
      serverErrors={serverErrors}
      title="Create Department Mapping"
      FormFields={FormFields}
      initialValues={initialValues}
    />
  )
}
