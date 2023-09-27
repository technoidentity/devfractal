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
import { rootLink } from '../routes'

export const addContact = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  await api.createContact({ request: await formData(request) })

  return redirect(rootLink)
}

export function AddContact() {
  return (
    <Card
      className="bg-gray-100 m-auto w-[80%] text-lg text-black"
      data-testid="add-contact"
    >
      <CardHeader>
        <CardTitle>Add new contact</CardTitle>
        <CardDescription>Please fill out the details! </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="post" className="rounded-2xl">
          <VStack className="gap-y-4 ">
            <VStack className="gap-y-2">
              <Label htmlFor="name" className="block text-left px-2">
                Name:
              </Label>
              <Input
                type="text"
                placeholder="Name"
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
                placeholder="Phone"
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
                placeholder="Email"
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
                placeholder="Website"
                name="website"
                className="rounded-full px-4"
              />
            </VStack>

            <HStack className="justify-evenly items-center">
              <Button
                type="submit"
                className="rounded-full border bg-blue-400 px-8 py-2 text-white"
              >
                Save
              </Button>
              <Link
                to={rootLink}
                className="rounded-full px-8 py-2 text-sm bg-red-500 text-white"
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
