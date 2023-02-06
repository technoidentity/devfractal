import {
  Box,
  Button,
  Center,
  Group,
  NumberInput,
  Paper,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import type { Ctc } from '@prisma/client'
import { Form } from '@remix-run/react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  ctc: z.number().positive(),
})

const initialValues = {
  id: '101',
  name: 'zubina',
  ctc: 240000,
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

interface UserCtcProps {
  fieldErrors: Ctc
  fields: Ctc
  formError?: string
}
export const UserCtc = ({ fieldErrors, fields, formError }: UserCtcProps) => {
  const form = useForm({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  })

  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <Center>
        <Title order={3} mt="xl">
          Add Employee CTC!
        </Title>
      </Center>
      <Box>
        <Text color="red">{formError ? formError : ''}</Text>
        <Form
          method="post"
          // onSubmit={form.onSubmit(values => console.log(values))}
        >
          <TextInput
            withAsterisk
            label="TI_ID"
            name="id"
            placeholder="Employee ID"
            {...form.getInputProps('id')}
            mt="xs"
          />
          <TextInput
            withAsterisk
            label="Username"
            name="name"
            placeholder="Employee Fullname"
            {...form.getInputProps('name')}
            error={fieldErrors?.name || ''}
            mt="xs"
          />
          <NumberInput
            withAsterisk
            label="CTC"
            name="ctc"
            placeholder="CTC if billable"
            {...form.getInputProps('ctc')}
            error={fieldErrors?.ctc || ''}
            mt="xs"
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
          <Group position="right" mt="xl">
            <Button type="submit">Submit</Button>
          </Group>
        </Form>
      </Box>
    </Paper>
  )
}
