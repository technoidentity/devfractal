import { Billable } from '@prisma/client'
import { CreateExpenditureSpec } from '~/common'
import type { CreateProps } from '../common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateExpenditureSpec = {
  amount: 1800000,
  category: Billable.billable,
  date: new Date(),
  departmentId: 0,
  remarks: '',
}

export const CreateExpenditureForm = (
  serverErrors: CreateProps<CreateExpenditureSpec>,
) => {
  return (
    <CreateForm
      spec={CreateExpenditureSpec}
      initialValues={initialValues}
      title="Create Department Expenditure!"
      FormFields={FormFields}
      serverErrors={serverErrors}
    />
  )
}
