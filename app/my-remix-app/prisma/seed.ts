import { faker } from '@faker-js/faker'
import { PrismaClient, User } from '@prisma/client'
import { range } from 'lodash'
import { db } from '~/utils/db.server'
const prisma = new PrismaClient()

function createVideos(n: number) {
  return range(1, n).map(_ => ({
    title: faker.name.fullName(),
    description: faker.lorem.sentences(2),
    url: 'xGCm_cLxets',
  }))
}

function createUsers(n: number): Pick<User, 'username' | 'passwordHash'>[] {
  return range(1, n).map(_ => ({
    username: faker.name.firstName(),
    passwordHash: 'secret',
  }))
}

async function main() {
  for (let i = 0; i <= 9; i += 1) {
    await prisma.course.create({
      data: {
        title: faker.name.fullName(),
        description: faker.lorem.sentence(),
        videos: {
          create: createVideos(3),
        },
      },
    })

    await Promise.all(
      createUsers(6).map(user => {
        return db.user.create({
          data: {
            username: user.username,
            passwordHash: user.passwordHash,
          },
        })
      }),
    )
  }
}

main()
  .catch(e => {
    console.log(e)
    process.exit()
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
