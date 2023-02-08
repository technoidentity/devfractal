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
import { Form, useNavigation, useSubmit } from '@remix-run/react'
import type { Errors } from '@srtp/remix-core'
import { getFieldError } from '@srtp/remix-react'
import React, { useState } from 'react'
import { CtcSchema } from '~/common/validators'

export type EditUserCtcModalProps = Readonly<{
  ctc: CtcSchema
  errors?: Errors<CtcSchema>
}>

export const EditUserCtcModal = ({ ctc, errors }: EditUserCtcModalProps) => {
  const navigate = useNavigation()
  const submit = useSubmit()
  const [opened, setOpened] = useState(false)

  const form = useForm({
    initialValues: ctc, // structuredClone?
    // validate: zodResolver(CtcSchema),
    validateInputOnBlur: true,
  })

  React.useEffect(() => {
    if (
      navigate.state === 'loading' &&
      Object.keys(errors?.fieldErrors || {}).length == 0
    ) {
      setOpened(false)
    }
  }, [errors, navigate.state])

  const errMsg = getFieldError(errors, form)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <Text color="red">{errors?.error ? errors.error : ''}</Text>

            <Form
              method="put"
              onSubmit={form.onSubmit((_, event) => {
                submit(event.currentTarget, { replace: true })
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
