import { Button } from '@mantine/core'
import { Form } from '@remix-run/react'
import { Hidden } from '@srtp/remix-react'

export type DeleteUserCtcProps = Readonly<{ id: string }>

export const DeleteCtcForm = ({ id }: DeleteUserCtcProps) => {
  return (
    <Form method="delete">
      <Hidden name="id" value={id} />
      <Button type="submit">Delete</Button>
    </Form>
  )
}
