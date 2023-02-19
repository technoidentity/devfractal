import { Billable } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { CreateExpenditureSchema } from '~/common/validators'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateExpenditureSchema = {
  amount: 1800000,
  category: Billable.billable,
  date: new Date(),
  departmentId: 0,
  remarks: '',
}

export type CreateExpenditureFormProps = Errors<CreateExpenditureSchema>

export const CreateExpenditureForm = (
  serverErrors: CreateExpenditureFormProps,
) => {
  return (
    <CreateForm
      spec={CreateExpenditureSchema}
      FormFields={FormFields}
      title="Create Department Expenditure!"
      initialValues={initialValues}
      serverErrors={serverErrors}
    />
  )
}
