import { str, toInt } from '@core/casts'
import { prisma } from '@core/prisma'
import { omit } from '@srtp/fn'
import { Discussion } from '@prisma/client'
import { array, number } from 'zod'
import { Args } from './utils'

export const getDiscussions = async (
  args: Args<'meetingId'>,
): Promise<readonly Discussion[]> => {
  const meetingId = str(args.meetingId)

  return prisma.discussion.findMany({ where: { meetingId } })
}

export const getDiscussion = async (args: Args<'id'>): Promise<Discussion> => {
  const id = toInt(args.id)

  const discussion = await prisma.discussion.findUnique({ where: { id } })

  if (discussion == null) {
    throw new Error(`no card found  with id:${id}`)
  }

  return discussion
}

export const postDiscussion = async (
  args: Args<'meetingId' | 'discussion'>,
) => {
  const meetingId = str(args.meetingId)

  return prisma.discussion.create({
    data: { meetingId, ...omit(args.discussion as Discussion, ['meetingId']) },
  })
}

export const updateDiscussion = async (args: Args<'id' | 'discussion'>) => {
  const discussionId = number().parse(+(args.id as string))

  return prisma.discussion.update({
    where: { id: discussionId },
    data: { ...(args.discussion as Discussion) },
  })
}

export const removeDiscussion = async (args: Args<'id'>) => {
  const id = toInt(args.id)

  return prisma.discussion.delete({
    where: { id },
  })
}

export const forwardDiscussions = async (
  args: Args<'id' | 'discussionIds'>,
) => {
  const meetingId = str(args.id)
  const discussionIds = array(number()).parse(args.discussionIds)

  await prisma.meeting.update({
    where: { id: meetingId },
    data: {
      discussions: {
        connect: [...discussionIds.map(id => ({ id }))],
      },
    },
  })

  return prisma.meeting.update({
    where: { id: meetingId },
    data: {
      discussions: {
        updateMany: discussionIds.map(did => ({
          where: { id: did },
          data: { forwarded: true },
        })),
      },
    },
    include: { actions: true, discussions: true },
  })
}
