/* eslint-disable @typescript-eslint/naming-convention */
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ResponseError, UnauthorizedError, fetch$ } from './fetch$'

describe('baseFetch', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  test('should handle successful requests correctly', async () => {
    const mockResponse = {
      status: 200,
      ok: true,
      json: () => ({ id: 1 }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }

    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos/1',
    )
    expect(data).toEqual(mockResponse.json())
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.any(Object),
    )
  })

  test('should handle failed requests correctly', async () => {
    const mockResponse = { status: 404, ok: false }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    expect.assertions(7)
    try {
      await fetch$('https://jsonplaceholder.typicode.com/todos/invalid')
    } catch (err) {
      const error = err as ResponseError
      expect(error).toBeInstanceOf(ResponseError)
      expect(error.message).toEqual('Not Found')
      expect(error.name).toEqual('HTTPError')
      expect(error.response.status).toEqual(mockResponse.status)
      expect(error.response.ok).toEqual(mockResponse.ok)
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/todos/invalid',
        expect.any(Object),
      )
    }
    // @TODO:
  })

  test('should handle unauthorized requests correctly', async () => {
    const mockResponse = {
      status: 401,
      ok: false,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    expect.assertions(7)
    try {
      await fetch$('https://jsonplaceholder.typicode.com/posts', {
        headers: { Authorization: 'Bearer invalid_token' },
      })
    } catch (err) {
      const error = err as UnauthorizedError
      expect(error).toBeInstanceOf(UnauthorizedError)
      expect(error.message).toContain('Unauthorized')
      expect(error.name).toEqual('UnauthorizedError')
      expect(error.response.status).toEqual(mockResponse.status)
      expect(error.response.ok).toEqual(mockResponse.ok)
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts',
        expect.any(Object),
      )
    }
  })

  test('should handle empty responses correctly', async () => {
    const mockResponse = { status: 204, ok: true }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        method: 'DELETE',
      },
    )
    expect(data).toBeNull()
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1',
      expect.any(Object),
    )
  })

  test('should handle all HTTP methods correctly', async () => {
    const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

    for (const method of methods) {
      const mockResponse = { status: 204, ok: true }
      const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
      global.fetch = mockFetch

      const [data, response] = await fetch$(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          method,
        },
      )

      expect(data).toBeNull()
      expect(response.status).toEqual(mockResponse.status)
      expect(response.ok).toEqual(mockResponse.ok)
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/posts/1',
        expect.any(Object),
      )
    }
  })
})

describe('Todo API', () => {
  const mockTodo = {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  }

  test('should fetch a single todo', async () => {
    const mockResponse = {
      status: 200,
      ok: true,
      json: () => mockTodo,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos/1',
    )

    expect(data).toEqual(mockTodo)
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.any(Object),
    )
  })

  test('should fetch all todos', async () => {
    const mockResponse = {
      status: 200,
      ok: true,
      json: () => [mockTodo],
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos',
    )

    expect(data).toEqual([mockTodo])
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      expect.any(Object),
    )
  })

  test('should create a new todo', async () => {
    const mockResponse = {
      status: 201,
      ok: true,
      json: () => mockTodo,
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos',
      {
        method: 'POST',
        body: mockTodo,
      },
    )

    expect(data).toEqual(mockTodo)
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos',
      expect.any(Object),
    )
  })

  test('should update an existing todo', async () => {
    const mockResponse = {
      status: 200,
      ok: true,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      json: () => mockTodo,
    }

    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos/1',
      {
        method: 'PUT',
        body: mockTodo,
      },
    )

    expect(data).toEqual(mockTodo)
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.any(Object),
    )
  })

  test('should delete an existing todo', async () => {
    const mockResponse = {
      status: 204,
      ok: true,
    }
    const mockFetch = vi.fn().mockResolvedValueOnce(mockResponse)
    global.fetch = mockFetch

    const [data, response] = await fetch$(
      'https://jsonplaceholder.typicode.com/todos/1',
      {
        method: 'DELETE',
      },
    )

    expect(data).toBeNull()
    expect(response.status).toEqual(mockResponse.status)
    expect(response.ok).toEqual(mockResponse.ok)
    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/todos/1',
      expect.any(Object),
    )
  })
})
