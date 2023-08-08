import { faker } from '@faker-js/faker'
import { z } from 'zod'

export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  job: z.string(),
})
export type User = z.infer<typeof User>

const usersTable = new Map<number, User>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let nextId: number
export function initializeFakeUsersTable(N = 50) {
  for (let i = 0; i < N; i++) {
    usersTable.set(i, {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
    })
  }
  nextId = N
}

initializeFakeUsersTable()

export const usersList = () => {
  console.log(nextId)
  return Array.from(usersTable.values())
}
