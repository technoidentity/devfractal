import { Box, Button, Group, Modal, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import { useState } from 'react'
import { DepartmentMappingSchema } from '~/common/validators'
import { FormErrors } from '../common'
import { FormFields } from './FormFields'

export type EditDepartmentFormProps = Readonly<{
  department: DepartmentMappingSchema
  errors?: Errors<DepartmentMappingSchema>
}>

const { Form, Inputs } = createForm(DepartmentMappingSchema)

export const EditDepartmentForm = ({
  department,
  errors,
}: EditDepartmentFormProps) => {
  const [opened, setOpened] = useState(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modify Employee Department!"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <FormErrors error={errors?.error} />

            <Form
              initialValues={department}
              serverErrors={errors}
              method="put"
              onSubmit={() => setOpened(false)}
            >
              <Inputs.Hidden name="id" />
              <FormFields Inputs={Inputs} />

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
