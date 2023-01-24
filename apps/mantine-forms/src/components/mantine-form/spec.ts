/* eslint-disable no-redeclare */
import { z } from 'zod'

const Library = z.enum(['react', 'ng', 'svelte', 'vue'])
const Category = z.enum(['seniorCitizen', 'generalPublic', 'employee'])

type Library = z.infer<typeof Library>
type Category = z.infer<typeof Category>

export const initialValues = {
  comment: '',
  age: 18,
  rating: 1,
  library: 'react',
  category: 'generalPublic',
  country: [],
  agree: false,
  email: '',
  password: '',
  confirmPassword: '',
  remember: false,
}

export const FormValueSchema = z
  .object({
    comment: z.string(),
    age: z.number(),
    rating: z.number(),
    library: Library,
    category: Category,
    country: z.string().array(),
    agree: z.boolean(),
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
    remember: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })
