import { cast } from '@srtp/core'
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  HStack,
  Text,
} from '@srtp/ui'
import { Form, Link, redirect, type LoaderFunctionArgs } from 'react-router-dom'

import { api } from '../api'
import { ContactID } from '../specs'

import { useContact } from './hooks'
import { contactRoutes } from './routes'

export const deleteContactAction = async ({ params }: LoaderFunctionArgs) => {
  const id = cast(ContactID, params['id'])

  await api.removeContact({ params: { id } })

  // @TODO: why this needs explicit type?
  const path: string = contactRoutes.removeContact.link({ id })

  return redirect(path)
}

export function ViewContact() {
  const contact = useContact()
  const { id } = contactRoutes.getContact.useParams()

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
      <CardFooter>
        <Form method="delete">
          <HStack className="justify-evenly items-center gap-x-10">
            <Link
              to={contactRoutes.updateContact.link({ id })}
              className="rounded-full border bg-white px-4 py-2 text-sm"
            >
              Edit
            </Link>

            <Button
              type="submit"
              className="rounded-full border px-4 py-2 text-sm text-white bg-red-500"
            >
              Delete
            </Button>
          </HStack>
        </Form>
      </CardFooter>
    </Card>
  )
}
