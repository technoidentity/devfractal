import { promiseState } from '@srtp/core'
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  // expectTypeOf,
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
    await expect(getPosts()).resolves.toBeInstanceOf(Array)
  })

  test('getPost', async () => {
    await expect(getPost(4)).resolves.toBeDefined()
    await expect(getPost(10)).resolves.toBeInstanceOf(Object)
  })

  test('getComments', async () => {
    await expect(getComments(1)).resolves.toBeDefined()
    await expect(getComments(3)).resolves.toBeInstanceOf(Array)
  })

  test('getPostsIds', async () => {
    await expect(getPostsIds(1, 3, 5, 7)).resolves.toBeDefined()
    await expect(getPostsIds(1, 2, 3)).resolves.toBeInstanceOf(Object)
  })

  test('createPost', async () => {
    await expect(
      createPost({ userId: 2, title: 'Test post', body: 'this should pass' }),
    ).resolves.toBeDefined()
    await expect(
      createPost({ userId: 2, title: 'Test post', body: 'this should pass' }),
    ).resolves.toBeInstanceOf(Object)
  })

  test('updatePost', async () => {
    await expect(
      updatePost(3, {
        userId: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeDefined()
    await expect(
      updatePost(2, {
        userId: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeInstanceOf(Object)
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
    await expect(
      replacePost(2, {
        userId: 2,
        id: 2,
        title: 'Test post',
        body: 'this should pass',
      }),
    ).resolves.toBeInstanceOf(Object)
  })

  test('deletePost', async () => {
    await expect(deletePost(3)).resolves.toBeUndefined()
  })

  test('getCommentsByUserId', async () => {
    await expect(getCommentsByUserId(2)).resolves.toBeDefined()
    await expect(getCommentsByUserId(3)).resolves.toBeInstanceOf(Array)
  }, 8000)
})
