import { formData } from '@srtp/router'
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
import { Form, Link, redirect, type LoaderFunctionArgs } from 'react-router-dom'

import { api } from '../api'

import { useContact } from './hooks'
import { contactRoutes } from './routes'

export const updateContact = async ({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response> => {
  const { data: contact } = await api.updateContact({
    params,
    request: await formData(request),
  })

  return redirect(contactRoutes.getContact.link({ id: contact.id }))
}

export function UpdateContact(): JSX.Element {
  const contact = useContact()
  const { id } = contactRoutes.updateContact.useParams()

  return (
    <Card className="my-auto bg-gray-100 w-[80%] text-lg">
      <CardHeader>
        <CardTitle>Edit Contact</CardTitle>
        <CardDescription className="italic">
          Please provide the new details!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="rounded-2xl">
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
                to={contactRoutes.getContact.link({ id })}
                className="rounded-full bg-red-500 text-white px-8 py-2 text-sm"
              >
                Cancel
              </Link>
            </HStack>
          </VStack>
        </Form>
      </CardContent>
    </Card>
  )
}
