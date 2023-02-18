import { Box, Button, Center, Group, Paper, Title } from '@mantine/core'
import type { Department } from '@prisma/client'
import { Billable } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import React from 'react'
import { CreateExpenditureSchema } from '~/common/validators'
import { FormErrors } from '../common'
import { FormFields } from './FormFields'

const initialValues: CreateExpenditureSchema = {
  amount: 1800000,
  category: Billable.billable,
  date: new Date(),
  departmentId: 0,
  remarks: '',
}

const { Form, Inputs } = createForm(CreateExpenditureSchema, initialValues)

export type ExpenditureFormProps = {
  error?: string
  errors?: Errors<CreateExpenditureSchema>
  departments: ReadonlyArray<Pick<Department, 'id' | 'name'>>
}

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

export const ExpenditureForm = (props: ExpenditureFormProps) => {
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <FormTitle>Add Department Expenditure</FormTitle>

      <Box>
        <FormErrors error={props.errors} />

        <Form
          initialValues={initialValues}
          method="post"
          serverErrors={props.errors}
          onSubmit={console.log}
        >
          <FormFields Inputs={Inputs} departments={props.departments} />
          <SubmitButton />
        </Form>
      </Box>
    </Paper>
  )
}
