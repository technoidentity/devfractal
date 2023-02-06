import {
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Paper,
  Text,
  TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import type { Ctc } from '@prisma/client'
import { Form, useNavigation, useSubmit } from '@remix-run/react'
import React, { useState } from 'react'
import { z } from 'zod'

type Errors = {
  fieldErrors: Ctc
  fields: Ctc
  formError: string | null
}

interface EditUserCtcModalProps {
  ctc: Ctc
  errors?: Errors
}

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  ctc: z.number().positive(),
})

export const EditUserCtcModal = ({ ctc, errors }: EditUserCtcModalProps) => {
  const navigate = useNavigation()

  const submit = useSubmit()
  const [opened, setOpened] = useState(false)
  const initialValues = {
    id: ctc.id,
    name: ctc.name,
    ctc: ctc.ctc,
    fromDate: ctc.fromDate,
    toDate: ctc.toDate,
  }
  const form = useForm({
    initialValues,
    validate: zodResolver(schema),
    validateInputOnBlur: true,
  })

  React.useEffect(() => {
    if (
      navigate.state === 'loading' &&
      Object.keys(errors?.fieldErrors || {}).length == 0
    ) {
      console.log(errors)
      setOpened(false)
    }
  }, [errors, navigate.state])

  const fieldErrors = errors?.fieldErrors
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <Text color="red">{errors?.formError ? errors.formError : ''}</Text>
            <Form
              method="put"
              onSubmit={form.onSubmit((_, event) => {
                submit(event.currentTarget, {
                  replace: true,
                })
              })}
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
                error={fieldErrors?.name || form.getInputProps('name').error}
                mt="xs"
              />
              <NumberInput
                withAsterisk
                label="CTC"
                name="ctc"
                placeholder="CTC if billable"
                {...form.getInputProps('ctc')}
                error={fieldErrors?.ctc || form.getInputProps('ctc').error}
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
              <input type="hidden" name="_action" value="edit" />
              <Group position="right" mt="xl">
                <Button type="submit">Update</Button>
              </Group>
            </Form>
          </Box>
        </Paper>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Edit</Button>
      </Group>
    </>
  )
}
