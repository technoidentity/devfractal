import type { CtxOrReq } from '@srtp/api'
import { pick$ } from '@srtp/fn'
import { isEmail } from '@srtp/spec'
import { addDays } from 'date-fns'
import type { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { parseCookies } from 'nookies'
import { prisma } from './prisma'

export const getAuth = async (ctx: CtxOrReq): Promise<Session | null> => {
  const session = await getSession(ctx)

  if (session !== null) {
    return session
  }

  const email = parseCookies(ctx)['test-login-email']
  if (!isEmail(email)) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (user === null) {
    return null
  }

  return {
    user: pick$(user, ['email', 'name', 'image']),
    expires: addDays(new Date(), 1).toISOString(),
  }
}
