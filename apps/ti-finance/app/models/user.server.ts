import type { Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'

import { prisma } from '~/db.server'

export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

function getRandomInt(max: number = 1000000) {
  return Math.floor(Math.random() * Math.floor(max))
}

// @TODO: replace it by signup page
const nextDummyId = () => `TI_${getRandomInt()}`

export async function createUser(email: User['email'], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  // @TODO:
  return prisma.user.create({
    data: {
      id: nextDummyId(),
      username: getRandomInt().toString(),
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User['email'],
  password: Password['hash'],
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
