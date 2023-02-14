import { Button } from '@mantine/core'
import { Form } from '@remix-run/react'

export type DeleteUserCtcProps = Readonly<{ id: string }>

export const DeleteCtcForm = ({ id }: DeleteUserCtcProps) => {
  return (
    <Form method="delete">
      <input type="hidden" name="id" value={id} />
      <Button type="submit">Delete</Button>
    </Form>
  )
}
