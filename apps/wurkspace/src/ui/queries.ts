import { put } from '@core/api'
import { cast } from '@srtp/core'
import { supabase } from '@core/supabase'
import { Action } from '@specs/action'
import { Discussion } from '@specs/discussion'
import { Employee as EmployeeResponse } from '@specs/employee'
import { useOptMutation, useSafeQuery } from '@ui/core/useApi'
import { useAuth } from '@ui/core/useAuth'
import React from 'react'
import warning from 'tiny-warning'
import {
  CardsResponse,
  MeetingResponse,
  PendingActionsResponse,
  PreviousMeetingsResponse,
  UpComingMeetingsResponse,
  UsersResponse,
} from './responses'

const queries = {
  pendingActions: (email?: string | null) =>
    ({
      key: ['users', email, 'actions', 'pending'],
      spec: PendingActionsResponse,
    } as const),

  meeting: (eventId: string) =>
    ({ key: ['google', eventId], spec: MeetingResponse } as const),

  upcomingMeetings: (email?: string | null) =>
    ({
      key: ['google', 'events'],
      query: { email },
      options: { enabled: !!email },
      spec: UpComingMeetingsResponse,
    } as const),

  previousMeetings: (email?: string | null) =>
    ({
      key: ['meetings', 'completed'],
      query: { email },
      options: { enabled: !!email },
      spec: PreviousMeetingsResponse,
    } as const),

  managerProfile: (email?: string | null) =>
    ({
      key: ['zoho', 'profile', email, 'manager'],
      options: { staleTime: Infinity },
      spec: EmployeeResponse,
    } as const),

  users: () =>
    ({
      key: ['users'],
      options: { staleTime: Infinity },
      spec: UsersResponse,
    } as const),

  profile: (email?: string | null) =>
    ({
      key: ['zoho', 'profile', email],
      options: { staleTime: Infinity },
      spec: EmployeeResponse,
    } as const),

  cards: (meetingId?: string) =>
    ({
      key: ['meetings', meetingId, 'cards'],
      options: { refetchInterval: 3000 },
      spec: CardsResponse,
    } as const),
} as const

export const useProfile = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery(queries.profile(session?.user?.email))

  return { profile: data, error } as const
}

export const useUsers = () => {
  const { data, error } = useSafeQuery(queries.users())

  return { users: data, error } as const
}

export const useMeeting = (eventId: string) => {
  const { data, error } = useSafeQuery(queries.meeting(eventId))

  return { meeting: data, error } as const
}

export const useSupabase = (
  table = '*',
  event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
) => {
  warning(supabase, "supabase isn't defined")

  React.useEffect(() => {
    const subscription = supabase
      ?.channel(table)
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public' },
        payload => {
          console.log('Change received!', payload)
        },
      )
      .subscribe((...args: any[]) => {
        console.log('supabse realtime: ', ...args)
      })

    return () => {
      subscription &&
        supabase
          ?.channel(table)
          .unsubscribe()
          .catch(err => console.error(err))
    }
  }, [event, table])
}

export const useManagerProfile = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery(
    queries.managerProfile(session?.user?.email),
  )

  return { manager: data, error } as const
}

export const usePendingActions = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery(
    queries.pendingActions(session?.user?.email),
  )

  return { actions: data, error } as const
}

export const usePreviousMeetings = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery(
    queries.previousMeetings(session?.user?.email),
  )

  return { meetings: data, error } as const
}

export const useUpcomingMeets = () => {
  const [session] = useAuth()

  const { data, error } = useSafeQuery(
    queries.upcomingMeetings(session.user?.email),
  )

  return { meetings: data, error } as const
}

export const useCards = (meetingId: string) => {
  const { data, error, queryKey } = useSafeQuery(queries.cards(meetingId))

  return { cards: data, error, queryKey } as const
}

export const actionKey = (id: number) => `/api/actions/${id}`
export const discussionKey = (id: number) => `/api/discussions/${id}`

async function updateAction(action: Action) {
  return cast(Action, await put(actionKey(action.id), action))
}

async function updateDiscussion(discussion: Discussion) {
  return cast(Discussion, await put(discussionKey(discussion.id), discussion))
}

export const useCardMutations = (queryKey: any) => {
  const mutateAction = useOptMutation(queryKey, updateAction)
  const mutateDiscussion = useOptMutation(queryKey, updateDiscussion)

  return { mutateAction, mutateDiscussion } as const
}
