import { Box, Text } from '@srtp/ui'
import { Link } from 'react-router-dom'

import type { ContactList as Contacts } from '../types'

export function ContactList({ contacts }: { contacts: Contacts }): JSX.Element {
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
            <Link to={`/contacts/${contact.id}`}>
              <Text className="font-sans">{contact.name}</Text>
            </Link>
          </li>
        )
      })}
    </Box>
  )
}
