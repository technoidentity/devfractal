import { epDelete, epGet, epPatch, epPost, eps } from '@srtp/core'
import { createEpHttp } from '@srtp/web'

import { Contact, ContactID, ContactList } from './specs'

const idPathSegment = { id: ContactID }

const userPath = ['api', 'users'] as const
const idPath = [...userPath, idPathSegment] as const

export const endpoints = eps({
  list: epGet(userPath, ContactList),
  one: epGet(idPath, Contact),
  add: epPost(userPath, Contact.omit({ id: true }), Contact),
  update: epPatch(idPath, Contact.partial(), Contact),
  remove: epDelete(idPath),
})

export const api = createEpHttp(endpoints)
