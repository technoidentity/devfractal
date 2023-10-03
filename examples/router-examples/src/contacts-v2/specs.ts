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

export const CreateContact = Contact.omit({ id: true })
export type CreateContact = z.infer<typeof CreateContact>

export const UpdateContact = Contact.pick({ id: true }).merge(
  Contact.omit({ id: true }).partial(),
)
export type UpdateContact = z.infer<typeof UpdateContact>

export const ContactList = z.array(Contact)
export type ContactList = z.infer<typeof ContactList>

export function searchSpec<RawSpec extends z.ZodRawShape>(spec: RawSpec) {
  return z.object(spec).passthrough().optional()
}

export const Search = searchSpec({ search: z.string().optional() })
