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
import { Form, Link } from 'react-router-dom'

import { contactPaths } from '../paths'
import { useContact } from './hooks'

export function ViewContact() {
  const contact = useContact()
  const { id } = contactPaths.list.useParams()

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
              to={contactPaths.update.link({ id })}
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
