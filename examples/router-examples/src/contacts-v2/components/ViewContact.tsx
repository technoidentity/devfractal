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
import { Link } from 'react-router-dom'

import { contactsApi, listInvalidateKey } from '../api'
import { contactsPaths } from '../paths'

function useViewContact() {
  const { id } = contactsPaths.one.useParams()
  const [contact] = contactsApi.useOne({ params: { id } })
  const remove = contactsApi.useRemove({ invalidateKey: listInvalidateKey })
  const navigate = contactsPaths.remove.useNavigate()

  const onDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    remove.mutate(id, { onSettled: () => navigate({ id }) })
  }

  const updateLink = contactsPaths.update.link({ id })

  return { contact, onDelete, updateLink }
}

export function ViewContact() {
  const { contact, onDelete, updateLink } = useViewContact()

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
        <form onSubmit={onDelete}>
          <HStack className="justify-evenly items-center gap-x-10">
            <Link
              to={updateLink}
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
        </form>
      </CardFooter>
    </Card>
  )
}
