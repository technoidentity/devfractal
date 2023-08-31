import { faker } from '@faker-js/faker'
import { toArray } from '@srtp/fn'

import type { User } from './specs'

const usersTable = new Map<number, User>()

// let nextId: number
export function initializeFakeUsersTable(N = 50) {
  for (let i = 0; i < N; i++) {
    usersTable.set(i, {
      id: i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
    })
  }
  // nextId = N
}

initializeFakeUsersTable()

export const usersList = () => toArray(usersTable.values())
