import { pages } from '@srtp/router'
import { type LoaderFunctionArgs } from 'react-router-dom'

import { api } from '../api'
import type { Contact } from '../specs'
import { ContactID } from '../specs'

import { AddContact, addContact } from './AddContact'
import { ContactDeletedMessage } from './ContactDeletedMessage'
import { ErrorPage } from './ErrorPage'
import { RootLayout, getUsers } from './RootLayout'
import { UpdateContact, updateContact } from './UpdateContact'
import { ViewContact, deleteContactAction } from './ViewContact'

const idPathSegment = { id: ContactID }

export const loadRequest = async ({
  params,
}: LoaderFunctionArgs): Promise<Contact> => {
  const { data: contact } = await api.getContact({ params })

  return contact
}

// @TODO: this causes circular dependency between components and routes
export const contactRoutes = pages({
  getContact: {
    path: ['contacts', idPathSegment],
    element: <ViewContact />,
    loader: loadRequest,
    action: deleteContactAction,
    errorElement: <ErrorPage />,
  },

  updateContact: {
    path: ['contacts', idPathSegment, 'update'],
    element: <UpdateContact />,
    loader: loadRequest,
    action: updateContact,
  },

  removeContact: {
    path: ['contacts', idPathSegment, 'deleted'],
    element: <ContactDeletedMessage />,
  },

  addContact: {
    path: ['contacts', 'add'],
    element: <AddContact />,
    action: addContact,
  },
})

export const contactListRoute = pages({
  root: {
    path: [''],
    element: <RootLayout />,
    loader: getUsers,
    errorElement: <ErrorPage />,
    children: contactRoutes.routes,
  },
})

export const rootLink = contactListRoute.root.link({})
