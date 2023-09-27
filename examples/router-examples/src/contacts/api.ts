import { epDelete, epGet, epPatch, epPost, eps } from '@srtp/core'
import { createEpHttp } from '@srtp/web'

import { Contact, ContactID, ContactList } from './specs'

const idPathSegment = { id: ContactID }

const userPath = ['api', 'users'] as const
const idPath = [...userPath, idPathSegment] as const

const endpoints = eps({
  getContactList: epGet(userPath, ContactList),
  getContact: epGet(idPath, Contact),
  createContact: epPost(userPath, Contact.omit({ id: true }), Contact),
  updateContact: epPatch(idPath, Contact.partial(), Contact),
  removeContact: epDelete(idPath),
})

export const api = createEpHttp(endpoints)
