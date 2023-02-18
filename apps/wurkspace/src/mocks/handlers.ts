// @mocks/handlers.js
import { faqs } from '@fake/faqs'
import { organizationData } from '@fake/profile'
import { addDays } from 'date-fns'
import { rest } from 'msw'
import { z } from 'zod'
import {
  updateAction,
  updateDiscussion,
  actions,
  discussions,
  categories,
  addAction,
  addDiscussion,
} from './oneOnOne'

let count = 10

export const handlers = [
  rest.get('/api/auth/session', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          expires: addDays(new Date(), 1).toISOString(),
          user: {
            name: 'Foo Bar',
            email: 'foo@bar.com',
            image: undefined,
          },
        },
        false,
      ]),
    )
  }),

  // API for, to get upcoming meeting
  // rest.get('/upcomingmeet', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ upComingMeetData }))
  // }),
  // API for, to get previous meeting
  // rest.get('/prev-meet', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ prevMeetData }))
  // }),
  // API for, to get pending Action Items
  // rest.get('/pending-action-items', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ actionItemData }))
  // }),
  // // API for, to get Goals data
  // rest.get('/goals', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ goalsData }))
  // }),
  // API for, to get All Pending action items from the wurkspace
  // rest.get('/all-action-items', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ allActionItemData }))
  // }),
  rest.get('/api/v1/cards', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ actions, discussions, categories }))
  }),

  rest.patch('/api/v1/actions/:id', (req, res, ctx) => {
    const id = z.number().parse(req.params.id)

    const result = updateAction(id, req.body as any)
    if (result) {
      return res(ctx.status(200), ctx.json(result))
    }
    return res(ctx.status(400), ctx.json({ error: 'id not found' }))
  }),

  rest.patch('/api/v1/discussions/:id', (req, res, ctx) => {
    const id = z.number().parse(req.params.id)
    const result = updateDiscussion(id, req.body as any)
    if (result) {
      return res(ctx.status(200), ctx.json(result))
    }
    return res(ctx.status(400), ctx.json({ error: 'id not found' }))
  }),

  rest.post('/api/v1/actions', (req, res, ctx) => {
    const result = addAction(req.body as any)
    if (result) {
      return res(ctx.status(200), ctx.json(result))
    }
    return res(ctx.status(400), ctx.json({ error: 'no response' }))
  }),

  rest.post('/api/v1/discussions', (req, res, ctx) => {
    const result = addDiscussion(req.body as any)
    if (result) {
      return res(ctx.status(200), ctx.json(result))
    }
    return res(ctx.status(400), ctx.json({ error: 'no response' }))
  }),

  rest.get('/count', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ count }))
  }),
  rest.get('/organization-data', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ organizationData }))
  }),
  // rest.get('/personal-info', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ PersonalInformations }))
  // }),
  // rest.get('/goals-popup', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ GoalsData }))
  // }),
  // rest.get('/intelligent-context', (_, res, ctx) => {
  //   return res(ctx.status(200), ctx.json({ IntelligentContextList }))
  // }),

  // needhelp page get api
  rest.get('/help', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(faqs))
  }),

  rest.put<{ count: number }>('/count', (req, res, ctx) => {
    count = req.body.count
    return res(ctx.status(200), ctx.json({ count }))
  }),

  rest.post('/login', (_, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')
    return res(
      // Respond with a 200 status code
      ctx.status(200),
    )
  }),

  rest.get('/user', (_, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')
    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),

  rest.get('/my.backend/book', (_, res, ctx) => {
    return res(
      ctx.json({
        title: 'Lord of the Rings',
        imageUrl: '/book-cover.jpg',
        description:
          'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
      }),
    )
  }),
  rest.get('/reviews', (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
          author: 'John Maverick',
          text: 'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
        },
      ]),
    )
  }),
]
