import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { range } from 'lodash'
const prisma = new PrismaClient()

function createVideos(n: number) {
  return range(1, n).map(_ => ({
    title: faker.name.fullName(),
    description: faker.lorem.sentences(2),
    url: 'xGCm_cLxets',
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
