import { expect, test, describe, expectTypeOf } from 'vitest'
import { z } from 'zod'

import { restSpecs, type RestTypes } from './restSpecs'

describe('restSpecs', () => {
  const rawTasks = {
    id: z.number(),
    title: z.string(),
    done: z.boolean(),
  } as const

  const tasks = restSpecs(rawTasks)

  test('types', () => {
    type T = RestTypes<typeof rawTasks>

    expectTypeOf<T>().toEqualTypeOf<{
      readonly one: {
        readonly id: number
        readonly title: string
        readonly done: boolean
      }
      readonly many: {
        readonly id: number
        readonly title: string
        readonly done: boolean
      }[]
      readonly create: {
        readonly title: string
        readonly done: boolean
      }
      readonly update: {
        readonly id: number
        readonly title?: string | undefined
        readonly done?: boolean | undefined
      }
      readonly remove: {
        readonly id: number
      }
    }>()
  })

  test('casts', () => {
    expect(() =>
      tasks.one.parse({ id: 1, title: 'foo', done: false }),
    ).not.toThrow()

    expect(() => tasks.one.parse({ title: 'foo', done: false })).toThrow()

    expect(() =>
      tasks.many.parse([{ id: 1, title: 'foo', done: false }]),
    ).not.toThrow()

    expect(() =>
      tasks.create.parse({ title: 'foo', done: false }),
    ).not.toThrow()

    expect(() => tasks.create.parse({ title: 'foo', done: 'false' })).toThrow()

    expect(() =>
      tasks.update.parse({ id: 1, title: 'foo', done: false }),
    ).not.toThrow()

    expect(() => tasks.update.parse({ id: 1, done: false })).not.toThrow()
    expect(() => tasks.update.parse({ id: 1 })).not.toThrow()

    expect(() => tasks.update.parse({ title: 'foo', done: false })).toThrow()

    expect(() => tasks.remove.parse({ id: 1 })).not.toThrow()
    expect(() => tasks.remove.parse({ done: false })).toThrow()
    expect(() => tasks.remove.parse(100)).toThrow()
  })
})
