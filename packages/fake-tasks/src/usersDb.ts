import { faker } from '@faker-js/faker'
import { cast, isUndefined } from '@srtp/core'
import { filter, paged, pipe, sorted, toArray } from '@srtp/fn'
import invariant from 'tiny-invariant'

import { UserSearch, type User } from './specs'

const usersTable = new Map<number, User>()

let nextId: number
export function seedUsers(N = 50) {
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

function applySearch(
  list: Iterable<User>,
  { limit, page, job, search }: UserSearch,
) {
  const input = toArray(list)

  const result = pipe(
    input,
    sorted((a, b) => a.id - b.id),
    filter(t => isUndefined(job) || job.toLowerCase() === t.job.toLowerCase()),
    filter(t => isUndefined(search) || t.name.includes(search)),
    toArray,
    paged(page, limit),
  )

  return result
}

export function usersList(filters?: UserSearch): User[] {
  return applySearch(usersTable.values(), cast(UserSearch, filters ?? {}))
}

export function createUser(user: Omit<User, 'id'>): User {
  const id = nextId++
  const result = { id, ...user }
  usersTable.set(id, result)

  return result
}

export function replaceUser(id: number, user: User): User | undefined {
  invariant(id === user.id, 'id in path and body must match')

  if (!usersTable.has(id)) {
    return undefined
  }

  usersTable.set(id, user)
  return user
}

export function updateUser(id: number, user: Partial<User>): User | undefined {
  const existing = usersTable.get(id)
  if (!existing) {
    return undefined
  }

  const updated = { ...existing, ...user }
  usersTable.set(id, updated)
  return updated
}

export function removeUser(id: number): User | undefined {
  const user = usersTable.get(id)
  if (!user) {
    return undefined
  }

  usersTable.delete(id)

  return user
}
