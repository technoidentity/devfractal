import { z } from 'zod'

export const Employee = z.object({
  email: z.string(),
  mobile: z.string(),
  aboutMe: z.string(),
  photo: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  managerFirstName: z.string().nullable(),
  managerLastName: z.string().nullable(),
  managerEmail: z.string().nullable(),
  userId: z.string().nullable(),
})

export type Employee = z.infer<typeof Employee>
