import { Action } from '@specs/action'
import { Discussion } from '@specs/discussion'
import { Category } from '@specs/enums'
import { addDays } from 'date-fns'
import produce from 'immer'
import { v4 as uuid } from 'uuid'

export const categories: readonly Category[] = [
  'topOfMind',
  'wentWell',
  'learnings',
  'priorities',
  'challenges',
  'feedback',
]

export let actions: readonly Action[] = [
  {
    id: 5,
    completed: true,
    meetingId: uuid(),
    addedById: 'John Doe',
    select: 'action',
    dueDate: addDays(new Date(), 15),
    description: 'Approve/assign the XXXXX course in LMS',
    progress: '',
    category: 'challenges',
    assignedToId: '',
  },
  // {
  //   id: 11,
  //   completed: true,
  //   meetingId: uuid(),
  //   addedById: 'John Doe',

  //   select: 'action',
  //   description: 'Register for a course on XXXXXX',
  //   dueDate: new Date(),
  //   progress: '',
  //   category: 'learnings',
  // },
  // {
  //   id: 12,
  //   completed: true,
  //   meetingId: uuid(),
  //   addedById: 'John Doe',

  //   select: 'action',
  //   description: 'Add goals',
  //   dueDate: subDays(new Date(), 15),
  //   progress: '',
  //   category: 'learnings',
  // },
]

export let discussions: Discussion[] = [
  {
    id: 13,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'wentWell',
  },
  {
    id: 1,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'topOfMind',
  },
  {
    id: 2,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'wentWell',
  },
  {
    id: 3,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'learnings',
  },
  {
    id: 4,
    forwarded: false,
    meetingId: uuid(),
    discussion:
      'How are you planning to stay focussed on your learning while being busy at work',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'priorities',
  },

  {
    id: 6,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'feedback',
  },
  {
    id: 7,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'Team are burned out last week due to the tight timelines.',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'topOfMind',
  },
  {
    id: 8,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'When are you most productive? Morning / Afternoon / Evening?',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'topOfMind',
  },
  {
    id: 9,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'When are you most productive? Morning / Afternoon / Evening?',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),

    category: 'topOfMind',
  },
  {
    id: 10,
    forwarded: false,
    meetingId: uuid(),
    discussion: 'When are you most productive? Morning / Afternoon / Evening?',
    addedById: 'John Doe',
    notes: '',
    select: 'discussion',
    date: new Date(),
    category: 'topOfMind',
  },
]

export const updateAction = (
  id: number,
  values: Partial<Pick<Action, 'progress' | 'select'>>,
) => {
  const index = actions.findIndex(c => c.id === id)
  if (index === -1) {
    return undefined
  }

  actions = produce(actions, draft => {
    draft[index] = { ...draft[index], ...values }
  })

  return actions[index]
}

export const updateDiscussion = (
  id: number,
  values: Partial<Pick<Discussion, 'notes' | 'select'>>,
) => {
  const index = discussions.findIndex(c => c.id === id)
  if (index === -1) {
    return undefined
  }

  discussions = produce(discussions, draft => {
    draft[index] = { ...draft[index], ...values }
  })

  return discussions[index]
}

let nextID = 100

export const addAction = (action: Omit<Action, 'id'>) => {
  actions = produce(actions, draft => {
    draft.push({ id: nextID, ...action })
  })
  nextID += 1
  return actions
}

export const addDiscussion = (card: Omit<Discussion, 'id'>) => {
  discussions = produce(discussions, draft => {
    draft.push({ id: nextID, ...card })
  })
  nextID += 1
  return discussions
}
