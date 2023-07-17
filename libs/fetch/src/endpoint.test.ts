import { test } from 'vitest'
import { z } from 'zod'
import { linkfn, route } from './endpoint'

test('endpoint', () => {
  const fn = linkfn([
    'users',
    { id: z.number() },
    'posts',
    { postId: z.number() },
  ])

  const r = route([
    'users',
    { id: z.number() },
    'posts',
    { postId: z.number() },
  ])

  console.log({ r })
  const url = fn({ id: 1, postId: 2 })
  console.log({ url })
})
