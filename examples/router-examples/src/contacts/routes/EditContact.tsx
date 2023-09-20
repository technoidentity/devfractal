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
  const updates = safeFormData(Contact, request)

  await api.post(Contact, `users`, updates)

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
            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="name" className="block">
                Name:{' '}
              </Label>
              <Input
                type="text"
                placeholder={contact.name}
                id="name"
                name="name"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="phone">Contact:</Label>
              <Input
                type="text"
                placeholder={contact.phone}
                id="phone"
                name="contact"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="email">Email: </Label>
              <Input
                type="email"
                placeholder={contact.email}
                id="email"
                name="email"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="items-center gap-x-8 px-4">
              <Label htmlFor="job">Title: </Label>
              <Input
                type="text"
                placeholder={contact.website}
                name="job"
                id="job"
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
