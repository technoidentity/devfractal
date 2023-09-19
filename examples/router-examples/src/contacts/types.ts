import { number, spec, string } from '@srtp/core'
import z from 'zod'

export const Geo = z.object({
  lat: string(),
  lng: string(),
})

export const Address = z.object({
  street: string(),
  suite: string(),
  city: string(),
  zipcode: string(),
  geo: Geo,
})

export const Company = z.object({
  name: string(),
  catchPhrase: string(),
  bs: string(),
})

export const Contact = z.object({
  id: number(),
  name: string(),
  username: string(),
  email: string(),
  address: Address,
  phone: string(),
  website: string(),
  company: Company,
})
export type Contact = z.infer<typeof Contact>

export const ContactList = z.array(Contact)
export type ContactList = z.infer<typeof ContactList>

export const IDParams = spec({ id: number() })
export const Search = spec({ search: string().optional() })
