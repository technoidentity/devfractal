import { safeLoaderData } from '@srtp/router'

import { Contact, ContactList } from '../specs'

export const useContact = safeLoaderData(Contact)

export const useContactList = safeLoaderData(ContactList)
