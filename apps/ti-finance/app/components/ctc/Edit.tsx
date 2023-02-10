import { Box, Button, Group, Modal, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import { useState } from 'react'
import { CtcSchema } from '~/common/validators'
import { FormErrors } from '../common'

export type EditCtcModalFormProps = Readonly<{
  ctc: CtcSchema
  errors?: Errors<CtcSchema>
}>

const { Form, Inputs } = createForm(CtcSchema)

export const EditCtcModalForm = ({ ctc, errors }: EditCtcModalFormProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <FormErrors error={errors?.error} />

            <Form
              initialValues={ctc}
              serverErrors={errors}
              method="put"
              onSubmit={values => {
                console.log({ values })
                setOpened(false)
              }}
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

              <Inputs.Action action="edit" />

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
