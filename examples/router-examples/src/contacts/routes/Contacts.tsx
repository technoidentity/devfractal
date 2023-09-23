import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from '@srtp/ui'
import { Form, Link, redirect, type LoaderFunctionArgs } from 'react-router-dom'

import { api } from '../api'
import { useContact, useIdParams } from './hooks'

export const deleteContactAction = async ({ params }: LoaderFunctionArgs) => {
  await api.del$(`users/${params['id']}`)

  return redirect(`/contacts/${params['id']}/destroy`)
}

export function Contacts(): JSX.Element {
  const contact = useContact()
  const { id } = useIdParams()

  return (
    <Card className="m-auto space-y-4 p-8 bg-gray-100 border-2 shadow-md">
      <CardHeader>
        <CardTitle>{contact.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Text>{contact.phone}</Text>
        <Text>{contact.email}</Text>
        <Text>{contact.website}</Text>
      </CardContent>
      <CardFooter className="gap-x-10">
        <Link
          to={`/contacts/${Number(id)}/edit`}
          className="rounded-full border bg-white px-4 py-2 text-lg "
        >
          Edit
        </Link>
        <Form method="delete">
          <Button
            type="submit"
            className="rounded-full border bg-red-500 px-4 py-2 text-lg text-white bg-red-500"
          >
            Delete
          </Button>
        </Form>
      </CardFooter>
    </Card>
  )
}
