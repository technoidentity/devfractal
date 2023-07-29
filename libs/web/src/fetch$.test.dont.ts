import { describe, expect, test } from 'vitest'
import type { ResponseError } from './fetch$'
import { fetch$ } from './fetch$'

describe('baseFetch', () => {
  test('should handle successful requests correctly', async () => {
    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    expect(data).toBeDefined()
    expect(response.status).toEqual(200)
    expect(response.ok).toBeTruthy()
  })

  test('should handle failed requests correctly', async () => {
    try {
      await fetch$('https://jsonplaceholder.typicode.com/todos/invalid')
    } catch (err) {
      const error = err as ResponseError
      expect(error).toBeInstanceOf(Error)

      expect(error.message).toEqual('Not Found')

      expect(error.name).toEqual('HTTPError')
      expect(error.response.status).toEqual(404)
      expect(error.response.ok).toBeFalsy()
    }
  })

  test('should handle unauthorized requests correctly', async () => {
    try {
      await fetch$('https://jsonplaceholder.typicode.com/posts', {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: 'Bearer invalid_token' },
      })
    } catch (err) {
      const error = err as ResponseError
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toEqual('Unauthorized')
      expect(error.name).toEqual('UnauthorizedError')
      expect(error.response.status).toEqual(401)
      expect(error.response.ok).toBeFalsy()
    }
  })

  test('should handle empty responses correctly', async () => {
    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/posts/1',
      { method: 'DELETE' },
    )
    expect(data).toEqual({})
    expect(response.status).toEqual(200)
    expect(response.ok).toBeTruthy()
  })

  //   test('should handle binary responses correctly', async () => {
  //     const [data, response] = await baseFetch('https://httpbin.org/image/png', {
  //       responseType: 'blob',
  //     } as RequestInit)
  //     expect(data).toBeInstanceOf(Blob)
  //     expect(response.status).toEqual(200)
  //     expect(response.ok).toBeTruthy()
  //   }, 10000)
})
