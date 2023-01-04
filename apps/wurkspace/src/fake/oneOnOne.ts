import type { Action } from '@specs/action'
import type { Discussion } from '@specs/discussion'
import { addDays, subDays } from 'date-fns'

export const previousMeetingDiscussions: readonly Omit<
  Discussion,
  'id' | 'addedBy'
>[] = [
  {
    forwarded: false,
    discussion: 'Team are burned out last week due to the tight timelines.',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'topOfMind',
    addedById: '',
    meetingId: '',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion:
      'How are you feeling after an exhaustive week due to the deadlines ',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'wentWell',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'When are you most productive? Morning / Afternoon / Evening?',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'learnings',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'How shall we communicate? In Person / Email / IM / Text',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'priorities',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'What important truth do very few people agree with you on?',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'feedback',
  },
]

export const previousMeetingActions: readonly Omit<
  Action,
  'id' | 'addedById' | 'assignedToId' | 'meetingId'
>[] = [
  {
    completed: true,

    select: 'action',
    dueDate: addDays(new Date(), 15),
    description: 'Approve/assign the XXXXX course in LMS',
    progress: '',
    category: 'challenges',
  },
  {
    completed: true,
    select: 'action',
    description: 'Addressing about response time issue to team in next meeting',
    dueDate: new Date(),
    progress: '',
    category: 'learnings',
  },
  {
    completed: false,

    select: 'action',
    description: 'Add Profile Photo',
    dueDate: new Date(),
    progress: '',
    category: 'learnings',
  },
  {
    completed: false,

    select: 'action',
    description: 'Attend upcoming session on ReactJS',
    dueDate: new Date(),
    progress: '',
    category: 'learnings',
  },
]

export const currentMeetingDiscussions: readonly Omit<
  Discussion,
  'id' | 'addedBy'
>[] = [
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'Who has been your best boss so far? Why?',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'topOfMind',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'How happy are you with your current role and opportunities',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'topOfMind',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion:
      'How are you planning to stay focussed on your learning while being busy at work',

    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'topOfMind',
  },
]

export const currentMeetingActions: readonly Omit<
  Action,
  'id' | 'addedById' | 'assignedToId' | 'meetingId'
>[] = [
  {
    completed: true,
    select: 'action',
    description: 'Assign Goals for Upcoming Quarter',
    dueDate: new Date(),
    progress: '',
    category: 'learnings',
  },
  {
    completed: true,
    select: 'action',
    description: 'Submit KT Document on React',
    dueDate: new Date(),
    progress: '',
    category: 'challenges',
  },
]

export const actions: readonly Omit<
  Action,
  'id' | 'addedById' | 'assignedToId' | 'meetingId'
>[] = [
  {
    completed: false,

    select: 'action',
    description: 'Code Improvements',
    dueDate: new Date(),
    progress: '',
    category: 'feedback',
  },
  {
    completed: false,

    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'topOfMind',
  },
  {
    completed: false,

    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'topOfMind',
  },
  {
    completed: false,

    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'wentWell',
  },
  {
    completed: true,

    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'wentWell',
  },
  {
    completed: true,
    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'priorities',
  },
  {
    completed: true,

    select: 'action',
    description: 'Register for a course on XXXXXX',
    dueDate: new Date(),
    progress: '',
    category: 'priorities',
  },
  {
    completed: true,
    select: 'action',
    description: 'Add goals',
    dueDate: subDays(new Date(), 15),
    progress: '',
    category: 'priorities',
  },
  ...previousMeetingActions,
]
export const discussions: readonly Omit<Discussion, 'id' | 'addedBy'>[] = [
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion:
      'Learnt about a new feature in React and helped the team resolve issues w.r.t drag & drop',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'topOfMind',
  },
  {
    forwarded: false,
    addedById: '',
    meetingId: '',
    discussion: 'Code review to be done by a proficient person in React.',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'wentWell',
  },
  ...previousMeetingDiscussions,
]

export const cards = [...actions, ...discussions]
