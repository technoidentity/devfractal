import { promiseState } from '@srtp/core'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  expectTypeOf,
  test,
  vi,
} from 'vitest'
import {
  createPost,
  delay,
  deletePost,
  failureDelay,
  getComments,
  getCommentsByUserId,
  getPost,
  getPosts,
  getPostsIds,
  replacePost,
  successDelay,
  updatePost,
} from './asyncExamples'

describe.skip('async functions', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('delay', async () => {
    expect(() => delay(-1000)).toThrow()

    const p = delay(500)

    vi.advanceTimersByTime(400)
    expect(await promiseState(p)).toEqual({ state: 'pending' })

    vi.advanceTimersByTime(100)
    await expect(p).resolves.toBeUndefined()
  })

  test('successDelay', async () => {
    const success = successDelay(2000, 'Success')

    vi.advanceTimersByTime(1900)
    expect(await promiseState(success)).toEqual({ state: 'pending' })

    vi.advanceTimersByTime(100)
    await expect(success).resolves.toBe('Success')

    expect(() => successDelay(-100, 'Fails')).toThrow()
  })

  test('failureDelay', async () => {
    const failed = failureDelay(2000, 'it should fail')
    vi.advanceTimersByTime(1900)
    expect(await promiseState(failed)).toEqual({ state: 'pending' })

    vi.advanceTimersByTime(100)
    await expect(failed).rejects.toThrowError('it should fail')

    expect(() => failureDelay(-1000, 'this should throw error')).toThrow()
  })

  // test('timedFetch', async () => {
  //   await expect(
  //     timedFetch(10, 'https://jsonplaceholder.typicode.com/posts'),
  //   ).rejects.toThrow('timed out')
  //   await expect(
  //     timedFetch(7000, 'https://jsonplaceholder.typicode.com/posts'),
  //   ).resolves.toBeDefined()
  // }, 10000)

  test('getPosts', async () => {
    await expect(getPosts()).resolves.toBeDefined()
    expectTypeOf(getPosts()).resolves.toBeArray()
  })

  test('getPost', async () => {
    await expect(getPost(4)).resolves.toBeDefined()
    expectTypeOf(getPost(10)).resolves.toBeObject()
  })

  test('getComments', async () => {
    await expect(getComments(1)).resolves.toBeDefined()
    expectTypeOf(getComments(3)).resolves.toBeArray()
  })

  test('getPostsIds', async () => {
    await expect(getPostsIds(1, 3, 5, 7)).resolves.toBeDefined()
    expectTypeOf(getPostsIds(1, 2, 3)).resolves.toBeObject()
  })

  test('createPost', async () => {
    await expect(
      createPost({ userId: 2, title: 'Test post', body: 'this should pass' }),
    ).resolves.toBeDefined()
    expectTypeOf(
      createPost({ userId: 2, title: 'Test post', body: 'this should pass' }),
    ).resolves.toBeObject()
  })

  test('updatePost', async () => {
    await expect(
      updatePost(3, {
        userId: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeDefined()
    expectTypeOf(
      updatePost(2, {
        userId: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeObject()
  })

  test('replacePost', async () => {
    await expect(
      replacePost(3, {
        userId: 2,
        id: 3,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeDefined()
    expectTypeOf(
      replacePost(2, {
        userId: 2,
        id: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeObject()
  })

  test('deletePost', async () => {
    await expect(deletePost(3)).resolves.toBeUndefined()
    expectTypeOf(deletePost(2)).toEqualTypeOf<Promise<void>>()
  })

  test('getCommentsByUserId', async () => {
    await expect(getCommentsByUserId(2)).resolves.toBeDefined()
    expectTypeOf(getCommentsByUserId(3)).resolves.toBeObject()
  }, 8000)
})
