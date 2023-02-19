import { CreateCtcSchema } from '~/common/validators'
import type { CreateProps } from '../common'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues = {
  tiId: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

export const CreateCtcForm = (serverErrors: CreateProps<CreateCtcSchema>) => {
  return (
    <CreateForm
      FormFields={FormFields}
      serverErrors={serverErrors}
      title="Add Employee CTC!"
      initialValues={initialValues}
      spec={CreateCtcSchema}
    />
  )
}
