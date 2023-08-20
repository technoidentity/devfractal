/* eslint-disable @typescript-eslint/ban-types */
import { describe, expect, expectTypeOf, test } from 'vitest'
import { boolean, number, z } from 'zod'
import type {
  GetEpRequest,
  GetEpResponse,
  GetParamsArg,
  GetRequestArg,
  Params,
} from './endpoint'
import {
  endpoint,
  ep,
  epDelete,
  epGet,
  epPatch,
  epPost,
  epPut,
  eps,
} from './endpoint'

describe('endpoint', () => {
  test('should return a valid endpoint', () => {
    const path = ['users'] as const
    const method = 'get'
    const response = z.object({ id: z.number() })
    const request = z.undefined()
    const expected = endpoint({ path, method, response, request })
    const result = ep(path, method, request, response)
    expect(result).toEqual(expected)
  })

  test('Params', () => {
    const spath = ['users', 'todos'] as const
    type T = Params<typeof spath>
    expectTypeOf<T>().toEqualTypeOf<{}>()

    const path = ['users', { id: number() }, 'todos', { x: boolean() }] as const
    type T2 = Params<typeof path>
    expectTypeOf<T2>().toEqualTypeOf<Readonly<{ id: number; x: boolean }>>()
  })

  test('GetEpResponse', () => {
    const path = ['users', 'todos'] as const

    const response = z.object({ id: z.number(), x: z.boolean().optional() })
    const request = z.string()
    const ep = epGet(path, response, request)
    type T = GetEpResponse<typeof ep>
    expectTypeOf<T>().toEqualTypeOf<{ id: number; x?: boolean | undefined }>()

    const ep2 = epDelete(path)
    type T2 = GetEpResponse<typeof ep2>
    expectTypeOf<T2>().toEqualTypeOf<unknown>()
  })

  test('GetEpRequest', () => {
    const path = ['users', 'todos'] as const

    const request = z.object({ id: z.number(), x: z.boolean().optional() })
    const response = z.string()
    const ep = epGet(path, response, request)
    type T = GetEpRequest<typeof ep>
    expectTypeOf<T>().toEqualTypeOf<{ id: number; x?: boolean | undefined }>()

    const ep2 = epDelete(path)
    type T2 = GetEpRequest<typeof ep2>
    expectTypeOf<T2>().toEqualTypeOf<undefined>()
  })

  test('GetRequestArg', () => {
    const path = ['users', 'todos'] as const

    const request = z.object({ id: z.number(), x: z.boolean().optional() })
    const response = z.string()
    const ep = epGet(path, response, request)
    type T = GetRequestArg<typeof ep>
    expectTypeOf<T>().toEqualTypeOf<{
      request: { id: number; x?: boolean | undefined }
    }>()

    const ep2 = epDelete(path)
    type T2 = GetRequestArg<typeof ep2>
    expectTypeOf<T2>().toEqualTypeOf<{ request?: undefined }>()
  })

  test('GetParamsArg', () => {
    const path = [
      'users',
      { id: z.number() },
      'todos',
      { todoId: z.number() },
    ] as const

    const ep = epDelete(path)
    type T = GetParamsArg<typeof ep>
    expectTypeOf<T>().toEqualTypeOf<{
      readonly params: { readonly id: number; readonly todoId: number }
    }>()

    const ep2 = epDelete(['todos', 'users'] as const)
    type T2 = GetParamsArg<typeof ep2>
    expectTypeOf<T2>().toEqualTypeOf<{ readonly params?: undefined }>()
  })

  test('eps', () => {
    const epsObj = eps({
      getTodos: epGet(['users', 'todos'], z.string(), z.boolean()),

      postTodos: epPost(['users', 'todos'], z.string(), z.string()),

      putTodos: epPut(
        ['users', 'todos', { id: z.number() }],
        z.string(),
        z.string(),
      ),
      patchTodos: epPatch(
        ['users', 'todos', { id: z.number() }],
        z.string(),
        z.string(),
      ),
      deleteTodos: epDelete(['users', 'todos'], z.string()),
    })

    type T = typeof epsObj

    expectTypeOf<T>().toEqualTypeOf<{
      readonly getTodos: Readonly<{
        method: 'get'
        path: readonly ['users', 'todos']
        request: z.ZodBoolean
        response: z.ZodString
      }>
      readonly postTodos: Readonly<{
        method: 'post'
        path: readonly ['users', 'todos']
        request: z.ZodString
        response: z.ZodString
      }>
      readonly putTodos: Readonly<{
        method: 'put'
        path: readonly ['users', 'todos', { readonly id: z.ZodNumber }]
        request: z.ZodString
        response: z.ZodString
      }>
      readonly patchTodos: Readonly<{
        method: 'patch'
        path: readonly ['users', 'todos', { readonly id: z.ZodNumber }]
        request: z.ZodString
        response: z.ZodString
      }>
      readonly deleteTodos: Readonly<{
        method: 'delete'
        path: readonly ['users', 'todos']
        request: z.ZodUndefined
        response: z.ZodString
      }>
    }>()
  })

  test('epGet', () => {
    const ep = epGet(['users', 'todos'], z.string(), z.boolean())
    type T = typeof ep
    expectTypeOf<T>().toEqualTypeOf<
      Readonly<{
        method: 'get'
        path: readonly ['users', 'todos']
        request: z.ZodBoolean
        response: z.ZodString
      }>
    >()

    const ep2 = epGet(['users', 'todos'], z.string())
    type T2 = typeof ep2
    expectTypeOf<T2>().toEqualTypeOf<
      Readonly<{
        method: 'get'
        path: readonly ['users', 'todos']
        request: z.ZodUndefined
        response: z.ZodString
      }>
    >()
  })

  test('epPost', () => {
    const ep = epPost(['users', 'todos'], z.string(), z.boolean())
    type T = typeof ep
    expectTypeOf<T>().toEqualTypeOf<
      Readonly<{
        method: 'post'
        path: readonly ['users', 'todos']
        request: z.ZodString
        response: z.ZodBoolean
      }>
    >()
  })

  test('epPut', () => {
    const ep = epPut(
      ['users', 'todos', { id: z.number() }],
      z.string(),
      z.boolean(),
    )
    type T = typeof ep
    expectTypeOf<T>().toEqualTypeOf<
      Readonly<{
        method: 'put'
        path: readonly ['users', 'todos', { readonly id: z.ZodNumber }]
        request: z.ZodString
        response: z.ZodBoolean
      }>
    >()

    const ep2 = epPut(['users', 'todos'], z.string())
    type T2 = typeof ep2

    expectTypeOf<T2>().toEqualTypeOf<
      Readonly<{
        method: 'put'
        path: readonly ['users', 'todos']
        request: z.ZodString
        response: z.ZodUnknown
      }>
    >()
  })

  test('epPatch', () => {
    const ep = epPatch(
      ['users', 'todos', { id: z.number() }],
      z.string(),
      z.boolean(),
    )
    type T = typeof ep
    expectTypeOf<T>().toEqualTypeOf<
      Readonly<{
        method: 'patch'
        path: readonly ['users', 'todos', { readonly id: z.ZodNumber }]
        request: z.ZodString
        response: z.ZodBoolean
      }>
    >()

    const ep2 = epPatch(['users', 'todos'], z.string())
    type T2 = typeof ep2

    expectTypeOf<T2>().toEqualTypeOf<
      Readonly<{
        method: 'patch'
        path: readonly ['users', 'todos']
        request: z.ZodString
        response: z.ZodUnknown
      }>
    >()
  })

  test('epDelete', () => {
    const ep = epDelete(['users', 'todos'], z.string())
    type T = typeof ep
    expectTypeOf<T>().toEqualTypeOf<
      Readonly<{
        method: 'delete'
        path: readonly ['users', 'todos']
        request: z.ZodUndefined
        response: z.ZodString
      }>
    >()

    const ep2 = epDelete(['users', 'todos'])
    type T2 = typeof ep2
    expectTypeOf<T2>().toEqualTypeOf<
      Readonly<{
        method: 'delete'
        path: readonly ['users', 'todos']
        request: z.ZodUndefined
        response: z.ZodUnknown
      }>
    >()
  })
})
