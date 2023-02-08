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
import type { Errors } from '@srtp/remix-core'
import { getFieldError } from '@srtp/remix-react'
import { CtcSchema } from '~/common/validators'

// @TODO: User better initial values
const initialValues: CtcSchema = {
  id: '101',
  name: 'zubina',
  ctc: 240000,
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

export type AddUserCtcProps = Errors<Ctc>

export const AddUserCtc = (serverErrors: AddUserCtcProps) => {
  const form = useForm({
    initialValues,
    validate: zodResolver(CtcSchema),
    validateInputOnBlur: true,
  })

  const errMsg = getFieldError(serverErrors, form)

  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <Center>
        <Title order={3} mt="xl">
          Add Employee CTC!
        </Title>
      </Center>

      <Box>
        <Text color="red">{serverErrors.error ? serverErrors.error : ''}</Text>
        <Form method="post">
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
            error={errMsg('name')}
            mt="xs"
          />

          <NumberInput
            withAsterisk
            label="CTC"
            name="ctc"
            placeholder="CTC if billable"
            {...form.getInputProps('ctc')}
            error={errMsg('ctc')}
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
