import { Billable } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { CreateExpenditureSpec } from '~/common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateExpenditureSpec = {
  amount: 1800000,
  category: Billable.billable,
  date: new Date(),
  departmentId: 0,
  remarks: '',
}

export type CreateExpenditureFormProps = Errors<CreateExpenditureSpec>

export const CreateExpenditureForm = (
  serverErrors: CreateExpenditureFormProps,
) => {
  return (
    <CreateForm
      spec={CreateExpenditureSpec}
      FormFields={FormFields}
      title="Create Department Expenditure!"
      initialValues={initialValues}
      serverErrors={serverErrors}
    />
  )
}
