import { z } from 'zod'

export const Category = z.enum([
  'topOfMind',
  'wentWell',
  'learnings',
  'priorities',
  'challenges',
  'feedback',
])
export type Category = z.infer<typeof Category>

export const CardSelection = z.enum(['action', 'discussion', 'open', 'close'])
export type CardSelection = z.infer<typeof CardSelection>

export const ResponseStatus = z.enum([
  'needsAction',
  'declined',
  'tentative',
  'accepted',
])
export type ResponseStatus = z.infer<typeof ResponseStatus>

export const MeetingStatus = z.enum([
  'scheduled',
  'started',
  'completed',
  'delayed',
])
export type MeetingStatus = z.infer<typeof MeetingStatus>
