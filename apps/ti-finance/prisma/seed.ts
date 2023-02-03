import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const tiUsersCtc = [
  {
    id: '100',
    name: 'emma',
    ctc: 10,
    fromDate: new Date('2017-01-26'),
    toDate: new Date('2018-01-26'),
  },
  {
    id: '101',
    name: 'watson',
    ctc: 16,
    fromDate: new Date('2016-04-14'),
    toDate: new Date('2017-04-14'),
  },
  {
    id: '102',
    name: 'reena',
    ctc: 24,
    fromDate: new Date('2020-06-21'),
    toDate: new Date('2021-06-21'),
  },
  {
    id: '103',
    name: 'miland',
    ctc: 18,
    fromDate: new Date('2021-08-5'),
    toDate: new Date('2022-08-5'),
  },
]

async function seed() {
  const email = 'rachel@remix.run'

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const hashedPassword = await bcrypt.hash('racheliscool', 10)

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  for (let i = 0; i < tiUsersCtc.length; i += 1) {
    await prisma.ctc.create({
      data: tiUsersCtc[i],
    })
  }

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
