import { Box, Text } from '@srtp/ui'
import { Link } from 'react-router-dom'

import type { ContactList as Contacts } from '../types'

export function ContactList({ contacts }: { contacts: Contacts }): JSX.Element {
  return (
    <Box as="ul" className="h-[80vh] overflow-y-auto bg-gray-100">
      {contacts.map(contact => {
        return (
          <li
            key={contact.id}
            className="border py-4 hover:bg-blue-500 hover:text-white"
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
