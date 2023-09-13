import { http } from '@srtp/web'
import { type LoaderFunctionArgs } from 'react-router-dom'

import { ContactList } from '../types'
import { baseUrl } from './common'

export const getUsers = async ({
  request,
}: LoaderFunctionArgs): Promise<ContactList> => {
  const [contacts] = await http.get(ContactList, `${baseUrl}/users`)

  const url = new URL(request.url)
  const search = url.searchParams.get('search')

  return search
    ? contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(search.toLowerCase()),
      )
    : contacts
}
