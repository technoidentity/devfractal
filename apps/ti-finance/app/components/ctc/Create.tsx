import { CreateCtcSpec } from '~/common'
import type { CreateProps } from '../common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateCtcSpec = {
  tiId: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

export const CreateCtcForm = (serverErrors: CreateProps<CreateCtcSpec>) => {
  return (
    <CreateForm
      spec={CreateCtcSpec}
      initialValues={initialValues}
      title="Add Employee CTC!"
      FormFields={FormFields}
      serverErrors={serverErrors}
    />
  )
}
