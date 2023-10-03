import { epDelete, epGet, epPatch, epPost } from '@srtp/core'
import { epQueryState } from '@srtp/query'

import { Contact, ContactID, ContactList, Search } from './specs'

const idPathSegment = { id: ContactID }

const userPath = ['api', 'users'] as const
const idPath = [...userPath, idPathSegment] as const

const endpoints = {
  list: epGet(userPath, ContactList, Search),
  one: epGet(idPath, Contact),
  add: epPost(userPath, Contact.omit({ id: true }), Contact),
  update: epPatch(idPath, Contact.partial(), Contact),
  remove: epDelete(idPath),
} as const

export const contactsApi = epQueryState(endpoints, '/', {
  add(contact: Omit<Contact, 'id'>) {
    return { request: contact }
  },

  update(contact: Partial<Contact> & { id: number }) {
    return { request: contact, params: { id: contact.id } }
  },

  remove(id: ContactID) {
    return { params: { id } }
  },
})

export const listInvalidateKey = userPath
