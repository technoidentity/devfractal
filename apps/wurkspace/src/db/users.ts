import { prisma } from '@core/prisma'
import { pick$ } from '@srtp/fn'
import { toStr } from '@srtp/spec'
import { addDays } from 'date-fns'
import type { Session } from 'next-auth'
import invariant from 'tiny-invariant'
import type { Args } from './utils'

export const getSessionByUser = async (
  args: Args<'email'>,
): Promise<Session> => {
  const email = toStr(args.email)

  const user = await prisma.user.findFirst({ where: { email } })

  invariant(user)

  return {
    expires: addDays(new Date(), 1).toISOString(),
    user: pick$(user, ['name', 'email', 'image']),
  }
}
