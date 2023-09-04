import { type LoaderFunctionArgs } from 'react-router-dom'
import axios from 'redaxios'
import { type Contact } from '../types'
import { baseUrl } from './common'

export const getUsers = async ({
  request,
}: LoaderFunctionArgs): Promise<Contact> => {
  const contacts = await axios
    .get(`${baseUrl}/users`)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })

  const url = new URL(request.url)
  const search = url.searchParams.get('search')

  return search
    ? contacts.filter((contact: any) =>
        contact.name.toLowerCase().includes(search.toLowerCase()),
      )
    : contacts
}
