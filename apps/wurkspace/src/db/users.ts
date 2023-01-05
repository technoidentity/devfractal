import { str } from '@srtp/core'
import { prisma } from '@srtp/next'
import { pick } from '@srtp/fn'
import { addDays } from 'date-fns'
import { Session } from 'next-auth'
import invariant from 'tiny-invariant'
import { Args } from './utils'

export const getSessionByUser = async (
  args: Args<'email'>,
): Promise<Session> => {
  const email = str(args.email)

  const user = await prisma.user.findFirst({ where: { email } })

  invariant(user)

  return {
    expires: addDays(new Date(), 1).toISOString(),
    user: pick(user, ['name', 'email', 'image']),
  }
}
