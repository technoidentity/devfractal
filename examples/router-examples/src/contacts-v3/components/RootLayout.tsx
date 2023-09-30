import { Box, HStack, Input, Label, Text } from '@srtp/ui'
import { Link, Outlet, useSubmit } from 'react-router-dom'

import { contactPaths, rootPath } from '../paths'
import { type ContactList as Contacts } from '../specs'

function ListContacts({ contacts }: { contacts: Contacts }) {
  return (
    <Box
      as="ul"
      className="h-[80vh] overflow-y-auto bg-gray-100 rounded-t-lg space-y-2 py-2 px-1"
    >
      {contacts.map(contact => {
        return (
          <li
            key={contact.id}
            className="border hover:bg-blue-500 hover:text-white shadow-md p-2 rounded-lg border-2"
          >
            <Link to={contactPaths.contact.link({ id: contact.id })}>
              <Text className="font-sans">{contact.name}</Text>
            </Link>
          </li>
        )
      })}
    </Box>
  )
}

export function RootLayout(): JSX.Element {
  const { contacts } = rootPath.contacts.useLoaderData()
  const submit = useSubmit()

  return (
    <Box
      as="aside"
      className="grid grid-cols-2 px-2 text-center text-black py-2"
    >
      <Box as="section" className="w-3/5 space-y-1">
        <HStack className="gap-x-4 border-2 bg-gray-200 p-4 justify-center rounded-lg">
          <Label>
            <Input
              className="rounded-full w-full border px-4 py-2"
              type="search"
              name="search"
              placeholder="Search..."
              onChange={e => {
                submit(e.currentTarget.form)
              }}
            />
          </Label>
          <Link
            to={contactPaths.add.link({})}
            className="rounded-lg border bg-white px-4 py-1 hover:bg-blue-400 hover:text-white"
          >
            New
          </Link>
        </HStack>

        <ListContacts contacts={contacts} />
      </Box>
      <Outlet />
    </Box>
  )
}
