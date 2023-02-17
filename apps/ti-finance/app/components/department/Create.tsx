import { Box, Button, Center, Group, Paper, Title } from '@mantine/core'
import { Billable } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import React from 'react'
import { FormErrors } from '../common'
import { FormFields } from './FormFields'
import { CreateMappingSchema } from './specs'

const initialValues: CreateMappingSchema = {
  tiId: '',
  departmentId: -1111,
  ctc: 0,
  category: Billable.billable,
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

const { Form, Inputs } = createForm(CreateMappingSchema)

export type CreateDepartmentProps = Errors<CreateMappingSchema>

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

export const CreateDepartmentForm = (serverErrors: CreateDepartmentProps) => {
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <FormTitle>Add Employee Department!</FormTitle>

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
