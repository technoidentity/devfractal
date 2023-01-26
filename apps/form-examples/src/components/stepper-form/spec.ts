/* eslint-disable no-redeclare */
import { z } from 'zod'

// const Library = z.enum(['react', 'ng', 'svelte', 'vue'])
// const Category = z.enum(['seniorCitizen', 'generalPublic', 'employee'])

// type Library = z.infer<typeof Library>
// type Category = z.infer<typeof Category>

export const initialValues = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  library: '',
  typeLibrary: '',
  fullStackDeveloper: false,
  yearsOfExperience: '',
  location: '',
  previousJob: '',
  dateOfBirth: new Date(),
  age: 20,
  json: '',
  favorite: '',
  segmentedControl: '',
  slider: '',
  file: '',
  color: '',
  rating: 2,
  dateOfJoining: new Date(),
  server: '',
  agree: false,
  time: '',
}

export const StepOneSchema = z
  .object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    library: z.string(),
    typeLibrary: z.string(),
    fullStackDeveloper: z.boolean(),
    yearsOfExperience: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

export const StepTwoSchema = z.object({
  location: z.string(),
  previousJob: z.string(),
  dateOfBirth: z.string().datetime(),
  age: z.number(),
  json: z.string(),
  favorite: z.string(),
})

export const StepThreeSchema = z.object({
  segmentedControl: z.string(),
  slider: z.number(),
  file: z.string(),
  color: z.string(),
  rating: z.number(),
  dateOfJoining: z.string().datetime(),
  server: z.string(),
  agree: z.boolean(),
  time: z.string().datetime(),
})
