import { safeFormData } from '@srtp/router'
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
import { Contact } from '../types'
import { useContact, useIdParams } from './hooks'

export const editContact = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  const contact = await safeFormData(Contact.partial(), request)

  await api.patch(Contact, `users/${contact.id}`, contact)

  return redirect('/')
}

export function EditContact(): JSX.Element {
  const contact = useContact()
  const { id } = useIdParams()

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
            <input type="hidden" name="id" defaultValue={contact.id} />
            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="name" className="block">
                Name:
              </Label>
              <Input
                type="text"
                defaultValue={contact.name}
                name="name"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="phone">Contact:</Label>
              <Input
                type="text"
                defaultValue={contact.phone}
                name="phone"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="email">Email: </Label>
              <Input
                type="email"
                defaultValue={contact.email}
                name="email"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="job">Title: </Label>
              <Input
                type="text"
                defaultValue={contact.website}
                name="website"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="flex mt-8 items-center justify-evenly">
              <Button
                type="submit"
                className="rounded-full border bg-blue-400 px-8 py-2 text-white"
              >
                Save
              </Button>
              <Link
                to={`/contacts/${id}`}
                className="rounded-full bg-white px-4 py-2"
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
