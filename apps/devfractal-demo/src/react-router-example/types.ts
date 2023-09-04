import z from 'zod'

export const Geo = z.object({
  lat: z.string(),
  lng: z.string(),
})

export const Address = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: Geo,
})

export const Company = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
})

export const Contact = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: Address,
  phone: z.string(),
  website: z.string(),
  company: Company,
})

export const ContactList = z.array(Contact)

export type Contact = z.infer<typeof Contact>
export type ContactArray = z.infer<typeof ContactList>
