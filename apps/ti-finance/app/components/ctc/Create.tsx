import { Box, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import { CreateCtcSchema } from '~/common/validators'
import { FormErrors, FormTitle, SubmitButton } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateCtcSchema = {
  tiId: '',
  name: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

const { Form, Inputs } = createForm(CreateCtcSchema, initialValues)

export type CreateCtcFormProps = Errors<CreateCtcSchema>

export const CreateCtcForm = (serverErrors: CreateCtcFormProps) => {
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <FormTitle>Add Employee CTC!</FormTitle>

      <Box>
        <FormErrors error={serverErrors} />

        <Form
          initialValues={initialValues}
          method="post"
          serverErrors={serverErrors}
        >
          <FormFields Inputs={Inputs} />

          <SubmitButton />
        </Form>
      </Box>
    </Paper>
  )
}
