import { safeLoaderData, safeParams } from '@srtp/router'

import { Contact, ContactList, IDParams } from '../types'

export const useContact = safeLoaderData(Contact)

export const useContactList = safeLoaderData(ContactList)

export const useIdParams = safeParams(IDParams)
