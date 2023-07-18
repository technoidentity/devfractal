import { expect, test } from 'vitest'
import { z } from 'zod'
import { linkfn, paramsSpec, route } from './epFn'
import { path } from './endpoint'

// @TODO:
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

  expect(r).toEqual('/users/:id/posts/:postId')
  const url = fn({ id: 1, postId: 2 })
  expect(url).toEqual('/users/1/posts/2')
})

test('params', () => {
  const p = path([
    'hello',
    { id: z.number() },
    'world',
    { a: z.string(), b: z.number() },
    'universe',
    { c: z.boolean() },
  ])

  const schema = paramsSpec(p)
  const v = schema.parse({ id: 100, a: 'hello', b: 200, c: true })
  expect(v).toEqual({ id: 100, a: 'hello', b: 200, c: true })
})
