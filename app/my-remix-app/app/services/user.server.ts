import { db } from '~/utils/db.server'
import bcrypt from 'bcryptjs'

type LoginArgs = {
  username: string
  password: string
}
export const login = async ({ username, password }: LoginArgs) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
  })
  if (!user) {
    throw new Error('User not found')
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) {
    throw new Error('Password incorrect')
  }

  return user
}
