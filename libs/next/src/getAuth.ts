import { isEmail } from '@srtp/core'
import { prisma } from './prisma'
import { pick } from '@srtp/fn'
import { addDays } from 'date-fns'
import { GetServerSidePropsContext, NextApiRequest, PreviewData } from 'next'
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'
import { parseCookies } from 'nookies'
import { ParsedUrlQuery } from 'querystring'

interface CtxOrReq {
  req?: NextApiRequest
  ctx?: GetServerSidePropsContext
}

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
    user: pick(user, ['email', 'name', 'image']),
    expires: addDays(new Date(), 1).toISOString(),
  }
}
