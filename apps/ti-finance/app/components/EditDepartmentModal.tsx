import {
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Radio,
  Text,
  TextInput,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm, zodResolver } from '@mantine/form'
import { Form, useNavigation, useSubmit } from '@remix-run/react'
import React, { useState } from 'react'
import type { Errors } from '@srtp/remix-core'

import { DepartmentSchema } from '~/common/validators'
import { getFieldError } from '@srtp/remix-react'
import type { Department } from '@prisma/client'

interface EditDepartmentModalProps {
  department: Department
  errors?: Errors<Department>
}

export const EditDepartmentModal = ({
  department,
  errors,
}: EditDepartmentModalProps) => {
  const navigate = useNavigation()
  const submit = useSubmit()
  const [opened, setOpened] = useState(false)

  const form = useForm({
    initialValues: department,
    validate: zodResolver(DepartmentSchema),
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
                error={errMsg('name')}
                mt="xs"
              />
              <TextInput
                withAsterisk
                label="Department"
                name="department"
                placeholder="Employee Department"
                {...form.getInputProps('department')}
                error={errMsg('department')}
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
