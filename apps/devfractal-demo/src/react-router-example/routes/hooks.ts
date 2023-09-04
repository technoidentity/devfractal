import { safeLoaderData, safeParams } from 'devfractal'
import { number, z } from 'zod'
import { Contact, ContactList } from '../types'

export const useContact = safeLoaderData(Contact)

export const useContactList = safeLoaderData(ContactList)

export const useIdParams = safeParams(z.object({ id: number() }))
