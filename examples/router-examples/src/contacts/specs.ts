import z from 'zod'

export const ContactID = z.coerce.number().int()
export type ContactID = z.infer<typeof ContactID>

export const Contact = z.object({
  id: ContactID,
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  website: z.string(),
})

export type Contact = z.infer<typeof Contact>

export const ContactList = z.array(Contact)
export type ContactList = z.infer<typeof ContactList>

export const Search = z.object({ search: z.string().optional() })
