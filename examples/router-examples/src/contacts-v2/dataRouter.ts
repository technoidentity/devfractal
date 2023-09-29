import { cast } from '@srtp/core'
import { formData } from '@srtp/router'
import { redirect, type LoaderFunctionArgs } from 'react-router-dom'

import { api } from './api'
import { contactPaths, rootLink } from './paths'
import type { Contact, ContactList } from './specs'
import { ContactID } from './specs'

export const list = async (args: LoaderFunctionArgs): Promise<ContactList> => {
  const [contacts] = await api.list({})

  const { search } = contactPaths.list.search(args)

  return search
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase()),
      )
    : contacts
}

export const one = async ({ params }: LoaderFunctionArgs): Promise<Contact> => {
  const [contact] = await api.one({ params })

  return contact
}

export const add = async ({
  request,
}: LoaderFunctionArgs): Promise<Response> => {
  await api.add({ request: await formData(request) })

  return redirect(rootLink)
}

export const update = async ({
  request,
  params,
}: LoaderFunctionArgs): Promise<Response> => {
  const [contact] = await api.update({
    params,
    request: await formData(request),
  })

  return redirect(contactPaths.list.link({ id: contact.id }))
}

export const remove = async ({ params }: LoaderFunctionArgs) => {
  const id = cast(ContactID, params['id'])

  await api.remove({ params: { id } })

  // @TODO: why this needs explicit type?
  const path: string = contactPaths.remove.link({ id })

  return redirect(path)
}
