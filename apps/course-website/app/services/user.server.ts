import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { db } from '~/utils/db.server'
import { getUserSession, sessionStorage } from './session.server'

export type LoginArgs = {
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
    return
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash)

  if (!isCorrectPassword) {
    return
  }

  return { id: user.id, username }
}
export async function register({ username, password }: LoginArgs) {
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await db.user.create({
    data: { username, passwordHash },
  })

  return { id: user.id, username }
}

export async function logout(request: Request) {
  const session = await getUserSession(request)
  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
