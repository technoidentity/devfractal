import { Box, Button, Center, Group, Paper, Title } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import React from 'react'
import { CtcSchema } from '~/common/validators'
import { FormErrors } from '../common'
import { FormFields } from './FormFields'

const initialValues: CtcSchema = {
  id: '',
  name: '',
  ctc: 0,
  fromDate: new Date(),
  toDate: new Date(),
}

const { Form, Inputs } = createForm(CtcSchema, initialValues)

export type CreateCtcFormProps = Errors<CtcSchema>

const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <Center>
    <Title order={3} mt="xl">
      {children}
    </Title>
  </Center>
)

const SubmitButton = () => (
  <Group position="right" mt="xl">
    <Button type="submit">Submit</Button>
  </Group>
)

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
