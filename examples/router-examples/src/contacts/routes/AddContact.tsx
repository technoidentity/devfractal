import { safeFormData } from '@srtp/router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

export const addContact = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  const newContact = await safeFormData(Contact, request)

  await api.post(Contact, `users`, newContact)

  return redirect('/')
}

export function AddContact(): JSX.Element {
  return (
    <Card
      className="bg-gray-100 m-auto text-lg text-black"
      data-testid="add-contact"
    >
      <CardHeader>
        <CardTitle>Add new contact</CardTitle>
        <CardDescription>Please fill out the details! </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="rounded-2xl">
          <VStack>
            <HStack className="justify-between items-center gap-x-16">
              <Label htmlFor="name">Name: </Label>
              <Input
                type="text"
                placeholder="Name"
                id="name"
                name="name"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="justify-between items-center gap-x-16">
              <Label htmlFor="phone">Contact:</Label>
              <Input
                type="text"
                placeholder="Contact"
                id="phone"
                name="contact"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="justify-between items-center gap-x-16">
              <Label htmlFor="email">Email: </Label>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                className="rounded-full px-4"
              />
            </HStack>

            <HStack className="justify-between items-center gap-x-16">
              <Label htmlFor="job">Title: </Label>
              <Input
                type="text"
                placeholder="Job"
                name="job"
                id="job"
                className="rounded-full px-4"
              />
            </HStack>
          </VStack>
        </Form>
      </CardContent>
      <CardFooter className="flex gap-x-16 justify-evenly">
        <Link
          to="/"
          className="rounded-full border bg-blue-400 px-8 py-2 text-white"
        >
          Save
        </Link>
        <Link to="/" className="rounded-full bg-white px-4 py-2">
          Cancel
        </Link>
      </CardFooter>
    </Card>
  )
}
