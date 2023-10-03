import { pcast } from '@srtp/core'
import { pipe } from '@srtp/fn'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  HStack,
  Input,
  Label,
  VStack,
} from '@srtp/ui'
import { Link } from 'react-router-dom'

import { contactsApi } from '../api'
import { contactsPaths } from '../paths'
import { UpdateContact as UpdateContactSpec } from '../specs'

function useUpdateContact() {
  const { id } = contactsPaths.update.useParams()
  const [contact, invalidateKey] = contactsApi.useOne({ params: { id } })
  const update = contactsApi.useUpdate({ invalidateKey })
  const navigate = contactsPaths.one.useNavigate()

  const onUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const contact = pipe(
      new FormData(event.currentTarget),
      Object.fromEntries,
      pcast(UpdateContactSpec),
    )

    update.mutate(contact, { onSettled: () => navigate({ id }) })
  }

  const cancelLink = contactsPaths.one.link({ id })

  return { contact, onUpdate, cancelLink }
}
export function UpdateContact(): JSX.Element {
  const { contact, onUpdate: handleUpdate, cancelLink } = useUpdateContact()

  return (
    <Card className="my-auto bg-gray-100 w-[80%] text-lg">
      <CardHeader>
        <CardTitle>Edit Contact</CardTitle>
        <CardDescription className="italic">
          Please provide the new details!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="rounded-2xl">
          <VStack className="gap-y-4">
            <Input type="hidden" name="id" defaultValue={contact.id} />

            <VStack className="gap-y-2">
              <Label htmlFor="name" className="block text-left px-2">
                Name:
              </Label>
              <Input
                type="text"
                defaultValue={contact.name}
                name="name"
                className="rounded-full p-2"
              />
            </VStack>

            <VStack className="gap-y-2">
              <Label htmlFor="phone" className="block text-left px-2">
                Contact:
              </Label>
              <Input
                type="text"
                defaultValue={contact.phone}
                name="phone"
                className="rounded-full px-4"
              />
            </VStack>

            <VStack className="gap-y-2">
              <Label htmlFor="email" className="block text-left px-2">
                Email:
              </Label>
              <Input
                type="email"
                defaultValue={contact.email}
                name="email"
                className="rounded-full px-4"
              />
            </VStack>

            <VStack className="gap-y-2">
              <Label htmlFor="website" className="block text-left px-2">
                Website:{' '}
              </Label>
              <Input
                type="text"
                defaultValue={contact.website}
                name="website"
                className="rounded-full px-4"
              />
            </VStack>

            <HStack className="items-center justify-evenly">
              <Button
                type="submit"
                className="rounded-full border bg-blue-400 px-8 py-2 text-white"
              >
                Save
              </Button>
              <Link
                to={cancelLink}
                className="rounded-full bg-red-500 text-white px-8 py-2 text-sm"
              >
                Cancel
              </Link>
            </HStack>
          </VStack>
        </form>
      </CardContent>
    </Card>
  )
}
