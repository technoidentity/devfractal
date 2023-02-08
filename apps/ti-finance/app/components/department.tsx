import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  Radio,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import type { Department } from '@prisma/client'
import { Form, useSubmit } from '@remix-run/react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
})

const initialValues = {
  id: '',
  name: '',
  department: '',
  billable: 'billable',
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

interface DepartmentProps {
  fieldErrors: Department
  fields: Department
  formError: string
}
export const UserDepartment = ({
  fieldErrors,
  fields,
  formError,
}: DepartmentProps) => {
  const form = useForm({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  })
  const submit = useSubmit()
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <Center>
        <Title order={3} mt="xl">
          Add Employee Department!
        </Title>
      </Center>
      <Box>
        <Text color="red">{formError ? formError : ''}</Text>
        <Form
          method="post"
          onSubmit={form.onSubmit((_, event) => {
            submit(event.currentTarget, { replace: true })
          })}
        >
          <TextInput
            withAsterisk
            label="TI_ID"
            mt="xs"
            name="id"
            placeholder="Employee ID"
            {...form.getInputProps('id')}
          />
          <TextInput
            withAsterisk
            label="Username"
            name="name"
            placeholder="Employee Fullname"
            mt="xs"
            {...form.getInputProps('name')}
            error={fieldErrors?.name || form.getInputProps('name').error}
          />
          <TextInput
            withAsterisk
            label="Department"
            name="department"
            placeholder="Employee Department"
            mt="xs"
            {...form.getInputProps('department')}
            // error={fieldErrors?.name || ''}
          />
          <DatePicker
            placeholder="Pick date"
            name="fromDate"
            label="From date"
            withAsterisk
            {...form.getInputProps('fromDate')}
            mt="xs"
          />
          <DatePicker
            placeholder="Pick date"
            name="toDate"
            label="To date"
            withAsterisk
            {...form.getInputProps('toDate')}
            mt="xs"
          />
          <Radio.Group
            name="billable"
            label="Select whether employee is Billable or Non Billable"
            withAsterisk
            mt="sm"
            {...form.getInputProps('billable')}
          >
            <Radio label="Billable" value="billable" />
            <Radio label="Non Billable" value="nonBillable" />
          </Radio.Group>
          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </Form>
      </Box>
    </Paper>
  )
}
