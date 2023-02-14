import { Button } from '@mantine/core'
import { Form } from '@remix-run/react'

export type DeleteExpenditureProps = Readonly<{ id: number }>

export const DeleteExpenditure = ({ id }: DeleteExpenditureProps) => {
  return (
    <Form method="delete">
      <input type="hidden" name="id" value={id} />
      <Button type="submit">Delete</Button>
    </Form>
  )
}
