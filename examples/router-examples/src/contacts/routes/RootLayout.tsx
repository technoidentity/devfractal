import { Box, HStack, Input, Label } from '@srtp/ui'
import { Link, Outlet, useSubmit } from 'react-router-dom'

import { ContactList } from './ContactList'
import { useContactList } from './hooks'

export function RootLayout(): JSX.Element {
  const contacts = useContactList()
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
            to="/contacts/add"
            className="rounded-lg border bg-white px-4 py-1 hover:bg-blue-400 hover:text-white"
          >
            New
          </Link>
        </HStack>

        <ContactList contacts={contacts} />
      </Box>
      <Outlet />
    </Box>
  )
}
