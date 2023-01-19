import { TRPCError } from '@trpc/server'
import { EventEmitter } from 'events'
import { z } from 'zod'
import { publicProcedure, router } from './trpc'

let id = 0

const ee = new EventEmitter()
const db = {
  posts: [
    {
      id: ++id,
      title: 'hello',
    },
  ],
  messages: [createMessage('initial message')],
}
function createMessage(text: string) {
  const msg = {
    id: ++id,
    text,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  ee.emit('newMessage', msg)
  return msg
}

const postRouter = router({
  createPost: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      const post = {
        id: ++id,
        ...input,
      }
      db.posts.push(post)
      return post
    }),
  listPosts: publicProcedure.query(() => db.posts),
})

const messageRouter = router({
  addMessage: publicProcedure.input(z.string()).mutation(({ input }) => {
    const msg = createMessage(input)
    db.messages.push(msg)

    return msg
  }),
  listMessages: publicProcedure.query(() => db.messages),
})

// root router to call
export const appRouter = router({
  // merge predefined routers
  post: postRouter,
  message: messageRouter,
  // or individual procedures
  hello: publicProcedure.input(z.string().nullish()).query(({ input, ctx }) => {
    return `hello ${input ?? ctx.user?.name ?? 'world'}`
  }),
  // or inline a router
  admin: router({
    secret: publicProcedure.query(({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
      if (ctx.user?.name !== 'alex') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      return {
        secret: 'sauce',
      }
    }),
  }),
})

export type AppRouter = typeof appRouter
