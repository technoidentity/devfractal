import { Box, Button, Center, Group, Paper, Text, Title } from '@mantine/core'
import type { Ctc } from '@prisma/client'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import { CtcSchema } from '~/common/validators'

// @TODO: User better initial values
const initialValues: CtcSchema = {
  id: '101',
  name: 'zubina',
  ctc: 240000,
  fromDate: new Date('12-06-21'),
  toDate: new Date('12-06-22'),
}

const { Form, Inputs } = createForm(CtcSchema, initialValues)
export type CreateCtcFormProps = Errors<Ctc>

export const CreateCtcForm = (serverErrors: CreateCtcFormProps) => {
  return (
    <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
      <Center>
        <Title order={3} mt="xl">
          Add Employee CTC!
        </Title>
      </Center>

      <Box>
        <Text color="red">{serverErrors.error ? serverErrors.error : ''}</Text>
        <Form method="post" serverErrors={serverErrors}>
          <Inputs.Str
            withAsterisk
            label="TI_ID"
            name="id"
            placeholder="Employee ID"
            mt="xs"
          />

          <Inputs.Str
            withAsterisk
            label="Username"
            name="name"
            placeholder="Employee Fullname"
            mt="xs"
          />

          <Inputs.Number
            withAsterisk
            label="CTC"
            name="ctc"
            placeholder="CTC if billable"
            mt="xs"
          />

          <Inputs.DatePicker
            placeholder="Pick date"
            name="fromDate"
            label="From date"
            withAsterisk
            mt="xs"
          />

          <Inputs.DatePicker
            placeholder="Pick date"
            name="toDate"
            label="To date"
            withAsterisk
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
