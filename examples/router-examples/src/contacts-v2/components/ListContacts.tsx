import { useEvent } from '@srtp/react'
import { safeSearch } from '@srtp/router'
import { Box, HStack, Input, Label, Text } from '@srtp/ui'
import { Link } from 'react-router-dom'

import { contactsApi } from '../api'
import { contactsPaths } from '../paths'
import { Search } from '../specs'

const useSearchContact = safeSearch(Search)

function useListContacts() {
  const [search, setSearch] = useSearchContact()
  const [contacts] = contactsApi.useList({
    request: { search: search?.search ?? '' },
  })

  const onSearch = useEvent((evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      setSearch({ search: evt.currentTarget.value })
    }
  })

  return { search, onSearch, contacts }
}

type SearchBoxProps = {
  defaultValue?: string
  onSearch(evt: React.KeyboardEvent<HTMLInputElement>): void
}

function SearchBox(props: SearchBoxProps) {
  return (
    <HStack className="gap-x-4 border-2 bg-gray-200 p-4 justify-center rounded-lg">
      <Label>
        <Input
          className="rounded-full w-full border px-4 py-2"
          type="search"
          name="search"
          placeholder="Search..."
          defaultValue={props.defaultValue}
          onKeyDown={props.onSearch}
        />
      </Label>

      <Link
        to={contactsPaths.add.link({})}
        className="rounded-lg border bg-white px-4 py-1 hover:bg-blue-400 hover:text-white"
      >
        New
      </Link>
    </HStack>
  )
}
export function ListContacts() {
  const { search, contacts, onSearch } = useListContacts()

  return (
    <Box as="section" className="w-3/5 space-y-1">
      <SearchBox defaultValue={search?.search} onSearch={onSearch} />

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
              <Link to={contactsPaths.one.link({ id: contact.id })}>
                <Text className="font-sans">{contact.name}</Text>
              </Link>
            </li>
          )
        })}
      </Box>
    </Box>
  )
}
