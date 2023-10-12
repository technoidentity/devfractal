import { describe, expect, test } from 'vitest'
import { boolean, number, string, z } from 'zod'

import { cast } from '../spec'

import { keysfn, route, paramsSpec, linkfn } from './epFn'

describe('keysfn', () => {
  test('should return an array of keys for a given path', () => {
    const path = [
      'users',
      { id: z.string() },
      'posts',
      { postId: z.number() },
    ] as const
    const params = { id: '123', postId: 456 }
    const expectedKeys = ['users', '123', 'posts', 456]
    expect(keysfn(path, params)).toEqual(expectedKeys)
  })

  test('should return an array of keys for a given path without params', () => {
    const path = ['users', 'posts'] as const
    const expectedKeys = ['users', 'posts']
    expect(keysfn(path)).toEqual(expectedKeys)
  })
})

describe('linkfn', () => {
  test('should return a function that generates a URL with params', () => {
    const path = [
      'users',
      { id: number() },
      'posts',
      { postId: number() },
    ] as const

    const link = linkfn(path)
    const url = link({ id: 123, postId: 456 })
    expect(url).toBe('/users/123/posts/456')
  })

  test('should return a function that generates a URL without params', () => {
    const path = ['users', 'posts'] as const
    const link = linkfn(path)
    const url = link()
    expect(url).toBe('/users/posts')
  })
})

describe('paramsSpec', () => {
  test('should return a valid schema for a simple path', () => {
    const path = [
      'users',
      { id: z.number() },
      'posts',
      { postId: z.number() },
    ] as const
    const schema = paramsSpec(path)

    expect(cast(schema, { id: 1, postId: 2, foo: 100 })).toEqual({
      id: 1,
      postId: 2,
    })
    expect(() => cast(schema, { id: 1 })).toThrow()
    expect(() => cast(schema, { postId: 2 })).toThrow()
    expect(() => cast(schema, { id: '1', postId: 2 })).toThrow()
    expect(() => cast(schema, {})).toThrow()
  })

  test('should return a valid schema for a path with only one parameter', () => {
    const path = ['users', { id: z.number() }] as const
    const schema = paramsSpec(path)

    expect(cast(schema, { id: 1, foo: 100 })).toEqual({ id: 1 })
    expect(() => cast(schema, { id: '1' })).toThrow()
    expect(() => cast(schema, {})).toThrow()
  })

  test('should return an empty schema for a path with no parameters', () => {
    const path = ['users', 'posts'] as const
    const schema = paramsSpec(path)

    expect(cast(schema, { foo: 100 })).toEqual({})
    expect(cast(schema, {})).toEqual({})
  })
})

describe('route', () => {
  test('should return a simple route', () => {
    const path = ['users'] as const
    const expected = '/users'
    const result = route(path)
    expect(result).toEqual(expected)
  })

  test('should return a parameterized route with one parameter', () => {
    const path = ['users', { id: number() }] as const
    const expected = '/users/:id'
    const result = route(path)
    expect(result).toEqual(expected)
  })

  test('should return a parameterized route with multiple parameters', () => {
    const path = [
      'users',
      { id: number() },
      'posts',
      { postId: string() },
    ] as const
    const expected = '/users/:id/posts/:postId'
    const result = route(path)
    expect(result).toEqual(expected)
  })

  test('should return a parameterized route with multiple properties in an object', () => {
    const path = [
      'users',
      { id: number() },
      'address',
      { city: string(), state: string() },
    ] as const
    const expected = '/users/:id/address/:city/:state'
    const result = route(path)
    expect(result).toEqual(expected)
  })

  test('should return a parameterized route with a boolean', () => {
    const path = [
      'users',
      { id: number() },
      'isAdmin',
      { isAdmin: boolean() },
    ] as const
    const expected = '/users/:id/isAdmin/:isAdmin'
    const result = route(path)
    expect(result).toEqual(expected)
  })
})
