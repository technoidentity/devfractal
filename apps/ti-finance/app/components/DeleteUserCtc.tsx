import { Button } from '@mantine/core'
import { Form, useTransition } from '@remix-run/react'

export type DeleteUserCtcProps = Readonly<{ id: string }>

export const DeleteUserCtc = ({ id }: DeleteUserCtcProps) => {
  const transition = useTransition()
  const deleting = transition.submission

  return (
    <Form method="delete">
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        name="_action"
        value="delete"
        style={{ opacity: deleting ? '0.5' : '1' }}
      >
        {deleting ? 'Deleting' : 'Delete'}
      </Button>
    </Form>
  )
}
