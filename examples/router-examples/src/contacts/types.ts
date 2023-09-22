import { number, spec, string } from '@srtp/core'
import z from 'zod'

export const Contact = z.object({
  id: number(),
  name: string(),
  email: string(),
  phone: string(),
  website: string(),
})

export type Contact = z.infer<typeof Contact>

export const ContactList = z.array(Contact)
export type ContactList = z.infer<typeof ContactList>

export const IDParams = spec({ id: number() })
export const Search = spec({ search: string().optional() })
