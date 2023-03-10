import { str, toInt } from '@srtp/core'
import { prisma } from '@core/prisma'
import { omit } from '@srtp/fn'
import type { Action } from '@prisma/client'
import type { PendingActionsResponse } from '@ui/responses'
import type { Args } from './utils'

export const getActions = async (
  args: Args<'meetingId'>,
): Promise<readonly Action[]> => {
  const meetingId = str(args.meetingId)

  return prisma.action.findMany({ where: { meetingId } })
}

export const getAction = async (args: Args<'id'>): Promise<Action> => {
  const actionId = toInt(args.id)

  const action = await prisma.action.findUnique({
    where: {
      id: actionId,
    },
  })

  if (action == null) {
    throw new Error(`no action with id: ${actionId}`)
  }

  return action
}

export const getPendingActions = async (
  args: Args<'email'>,
): Promise<PendingActionsResponse> => {
  const email = str(args.email)

  const pendingActions = await prisma.action.findMany({
    where: {
      AND: [
        { completed: { equals: false } },
        {
          meeting: {
            calendarEvent: {
              OR: [{ attendee1: { email } }, { attendee2: { email } }],
            },
          },
        },
      ],
    },
  })

  if (pendingActions == null) {
    throw new Error(`no pending action found with email:${email}`)
  }

  return pendingActions
}

export const postAction = async (args: Args<'meetingId' | 'action'>) => {
  const meetingId = str(args.meetingId)

  return prisma.action.create({
    data: { meetingId, ...omit(args.action as Action, ['meetingId']) },
  })
}

export const updateAction = async (args: Args<'id' | 'action'>) => {
  const actionId = toInt(args.id as string)

  return prisma.action.update({
    where: { id: actionId },
    data: { ...(args.action as Action) },
  })
}

export const removeAction = async (args: Args<'id'>) => {
  const id = toInt(args.id)

  return prisma.action.delete({
    where: { id },
  })
}
