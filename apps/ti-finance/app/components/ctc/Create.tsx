import type { Errors } from '@srtp/remix-core'
import { CreateCtcSchema } from '~/common/validators'
import { CreateForm } from '../common'
import { FormFields } from './FormFields'

const initialValues = {
  tiId: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

export const CreateCtcForm = (serverErrors: Errors<CreateCtcSchema>) => {
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
