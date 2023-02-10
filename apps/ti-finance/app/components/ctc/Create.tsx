import { Box, Button, Center, Group, Paper, Text, Title } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import React from 'react'
import { CtcSchema } from '~/common/validators'
import { FormErrors } from '../common'

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
          method="post"
          serverErrors={serverErrors}
          initialValues={initialValues}
        >
          <Inputs.Str
            label="TI_ID"
            name="id"
            placeholder="Employee ID"
            mt="xs"
          />

          <Inputs.Str
            label="Username"
            name="name"
            placeholder="Employee Fullname"
            mt="xs"
          />

          <Inputs.Number
            label="CTC"
            name="ctc"
            placeholder="CTC if billable"
            mt="xs"
          />

          <Inputs.DatePicker
            placeholder="Pick date"
            name="fromDate"
            label="From date"
            mt="xs"
          />

          <Inputs.DatePicker
            placeholder="Pick date"
            name="toDate"
            label="To date"
            mt="xs"
          />

          <SubmitButton />
        </Form>
      </Box>
    </Paper>
  )
}
