import { Box, Button, Group, Modal, Paper } from '@mantine/core'
import type { Errors } from '@srtp/remix-core'
import { createForm } from '@srtp/remix-react'
import { useState } from 'react'
import { FormFields } from './FormFields'
import { FormErrors } from '../common'
import type { Department } from '@prisma/client'
import { ExpenditureSchema } from '~/common/validators'

export type EditExpenditureFormProps = Readonly<{
  exp: ExpenditureSchema
  errors?: Errors<ExpenditureSchema>
  departments: ReadonlyArray<Pick<Department, 'id' | 'name'>>
}>

const { Form, Inputs } = createForm(ExpenditureSchema)

export const EditExpenditureForm = ({
  exp,
  errors,
  departments,
}: EditExpenditureFormProps) => {
  const [opened, setOpened] = useState(false)
  const initialValues = { ...exp, departmentId: exp.departmentId.toString() }
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modify Department Expenditure!"
      >
        <Paper shadow={'lg'} p="lg" sx={{ maxWidth: 450 }} mt="xl" mx="auto">
          <Box>
            <FormErrors error={errors?.error} />

            <Form
              initialValues={initialValues as any}
              serverErrors={errors}
              method="put"
              onSubmit={values => {
                setOpened(false)
              }}
            >
              <Inputs.Hidden name="id" />
              <FormFields Inputs={Inputs} departments={departments} />
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
