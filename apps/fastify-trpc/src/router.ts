import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { observable } from '@trpc/server/observable'

type User = {
  id: string
  name: string
  bio?: string
}

const users: Record<string, User> = {}

export const t = initTRPC.create()

export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query(({ input }) => {
    return users[input] // input type is string
  }),
  hello: t.procedure.query(() => 'hello'),
  createUser: t.procedure
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142),
      }),
    )
    .mutation(({ input }) => {
      const id = Date.now().toString()
      const user: User = { id, ...input }
      users[user.id] = user
      return user
    }),
  randomNumber: t.procedure.subscription(() => {
    return observable<{ randomNumber: number }>(emit => {
      const timer = setInterval(() => {
        emit.next({ randomNumber: Math.random() })
      }, 1000)
      return () => {
        clearInterval(timer)
      }
    })
  }),
})

// export type definition of API
export type AppRouter = typeof appRouter
