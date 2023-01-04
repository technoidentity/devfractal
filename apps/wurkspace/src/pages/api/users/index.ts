import { prisma } from '@core/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await prisma.user.findMany()
  // @TODO: return only relevant fields?
  return res.status(200).json(users)
}
