import { faker } from '@faker-js/faker'

import { seedTasks } from './tasksDb'
import { seedUsers } from './usersDb'

export function seedDb(seed?: number) {
  faker.seed(seed)

  seedUsers()
  seedTasks()
}
