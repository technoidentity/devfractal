import { describe, expect, expectTypeOf, test } from 'vitest'
import { z } from 'zod'
import { restEndpoints } from './restEndpoints'

type RestEndpointsReturnType = ReturnType<typeof restEndpoints>

const spec = {
  name: z.string(),
  phone: z.number(),
  active: z.boolean(),
  id: z.number().default(100),
}

const search = {
  name: z.string(),
}

describe('restEndpoints', () => {
  test('arguments of type ZodRawShape', () => {
    const expected = {
      many: {
        path: ['/api/test'],
        method: 'get',
        response: z.array(z.object(spec)),
        request: z.object(search),
      },

      one: {
        path: ['/api/test', { id: z.number() }],
        method: 'get',
        response: z.object(spec),
        request: z.undefined().optional(),
      },

      add: {
        path: ['/api/test'],
        method: 'post',
        response: z.object(spec),
        request: z.object(spec).omit({ id: true }),
      },

      update: {
        path: ['/api/test', { id: spec['id'] }],
        method: 'put',
        response: z.object(spec),
        request: z.object(spec).partial(),
      },

      remove: {
        path: ['/api/test', { id: z.number() }],
        method: 'delete',
        request: z.undefined(),
        response: z.undefined(),
      },
    } as const

    expectTypeOf(restEndpoints(spec, search, '/api/test')).toMatchTypeOf<
      Readonly<RestEndpointsReturnType>
    >()

    expectTypeOf(restEndpoints(spec, search, '/api/test')).toBeObject()
    expect(restEndpoints(spec, search, '/api/test')).toHaveProperty('many')
    expect(restEndpoints(spec, search, '/api/test')).toHaveProperty('one')
    expect(restEndpoints(spec, search, '/api/test')).toHaveProperty('add')
    expect(restEndpoints(spec, search, '/api/test')).toHaveProperty('update')
    expect(restEndpoints(spec, search, '/api/test')).toHaveProperty('remove')

    expect(restEndpoints(spec, search, '/api/test')).toBeTypeOf(typeof expected)
  })

  test('argument of type AnyZodObject', () => {
    const searchObj = z.object(search)

    const expected = {
      many: {
        path: ['/api/testing'],
        method: 'get',
        response: z.array(z.object(spec)),
        request: search,
      },

      one: {
        path: ['/api/testing', { id: z.number() }],
        method: 'get',
        response: z.object(spec),
        request: z.undefined().optional(),
      },

      add: {
        path: ['/api/testing'],
        method: 'post',
        response: z.object(spec),
        request: z.object(spec).omit({ id: true }),
      },

      update: {
        path: ['/api/testing', { id: spec['id'] }],
        method: 'put',
        response: z.object(spec),
        request: z.object(spec).partial(),
      },

      remove: {
        path: ['/api/testing', { id: z.number() }],
        method: 'delete',
        request: z.undefined(),
        response: z.undefined(),
      },
    } as const

    expectTypeOf(restEndpoints(spec, searchObj, '/api/testing')).toMatchTypeOf<
      Readonly<RestEndpointsReturnType>
    >()

    expectTypeOf(restEndpoints(spec, search, '/api/testing')).toBeObject()
    expect(restEndpoints(spec, search, '/api/testing')).toHaveProperty('many')
    expect(restEndpoints(spec, search, '/api/testing')).toHaveProperty('one')
    expect(restEndpoints(spec, search, '/api/testing')).toHaveProperty('add')
    expect(restEndpoints(spec, search, '/api/testing')).toHaveProperty('update')
    expect(restEndpoints(spec, search, '/api/testing')).toHaveProperty('remove')

    expect(restEndpoints(spec, search, '/api/testing')).toBeTypeOf(
      typeof expected,
    )
  })
})
