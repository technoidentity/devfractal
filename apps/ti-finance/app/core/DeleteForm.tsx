import { Button } from '@mantine/core'
import { Form } from '@remix-run/react'

export type DeleteFormProps<ID extends string | number> = Readonly<{ id: ID }>

export function DeleteForm<ID extends string | number>({
  id,
}: DeleteFormProps<ID>) {
  return (
    <Form method="delete">
      <input type="hidden" name="id" value={id} />
      <Button type="submit">Delete</Button>
    </Form>
  )
}

// export type DeleteDepartmentProps = Readonly<{ id: number }>

// export const DeleteDepartment = ({ id }: DeleteDepartmentProps) => {
//   const transition = useTransition()
//   const deleting = transition.submission

//   return (
//     <Form method="delete">
//       <input type="hidden" name="id" value={id} />
//       <Button type="submit" name="_action" value="delete">
//         {deleting ? 'Deleting' : 'Delete'}
//       </Button>
//     </Form>
//   )
// }
