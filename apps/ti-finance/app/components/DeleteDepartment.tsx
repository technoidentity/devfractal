import { Button } from '@mantine/core'
import { Form, useTransition } from '@remix-run/react'

export type DeleteDepartmentProps = Readonly<{ id: number }>

export const DeleteDepartment = ({ id }: DeleteDepartmentProps) => {
  const transition = useTransition()
  const deleting = transition.submission

  return (
    <Form method="delete">
      <input type="hidden" name="id" value={id} />
      <Button type="submit" name="_action" value="delete">
        {deleting ? 'Deleting' : 'Delete'}
      </Button>
    </Form>
  )
}
