import { http } from 'devfractal'
import { type LoaderFunctionArgs } from 'react-router-dom'

import { Contact } from '../types'
import { baseUrl } from './common'

export const loadRequest = async ({
  params,
}: LoaderFunctionArgs): Promise<Contact> => {
  const [contact] = await http.get(Contact, `${baseUrl}/users/${params['id']}`)

  return contact
}
