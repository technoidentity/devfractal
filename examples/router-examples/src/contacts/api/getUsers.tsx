import { getSearchParams } from '@srtp/router'
import { type LoaderFunctionArgs } from 'react-router-dom'

import { ContactList, Search } from '../types'
import { api } from './common'

export const getUsers = async ({
  request,
}: LoaderFunctionArgs): Promise<ContactList> => {
  const contacts = await api.get(ContactList, `users`)

  const { search } = getSearchParams(Search, request)

  return search
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()),
      )
    : contacts
}
