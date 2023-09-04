import z from 'zod'

const geo = z.object({
  lat: z.string(),
  lng: z.string(),
})

const address = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo,
})

const company = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
})

const contact = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address,
  phone: z.string(),
  website: z.string(),
  company,
})

const contactList = z.array(contact)

export type Contact = z.infer<typeof contact>
export type ContactArray = z.infer<typeof contactList>

export function isContact(obj: unknown): obj is Contact {
  return contact.safeParse(obj).success
}

export function isContactArray(arr: unknown): arr is ContactArray {
  return contactList.safeParse(arr).success
}
