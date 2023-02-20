import { CreateCtcSpec } from '~/common'
import type { CreateProps } from '../common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues = {
  tiId: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

export const CreateCtcForm = (serverErrors: CreateProps<CreateCtcSpec>) => {
  return (
    <CreateForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Add Employee CTC!"
      initialValues={initialValues}
      spec={CreateCtcSpec}
    />
  )
}
