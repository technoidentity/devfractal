import { Link } from 'react-router-dom'
import type { ContactList as Contacts } from '../types'

export function ContactList({ contacts }: { contacts: Contacts }): JSX.Element {
  return (
    <ul className="h-[80vh] overflow-y-auto bg-gray-100">
      {contacts.map(contact => {
        return (
          <li
            key={contact.id}
            className="border p-8 hover:bg-blue-500 hover:text-white"
          >
            <Link to={`/contacts/${contact.id}`}>
              <p className="text-lg">{contact.name}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
