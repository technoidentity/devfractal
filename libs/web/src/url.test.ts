import { describe, expect, test } from 'vitest'

import {
  formDataToSearch,
  fromSearchParams,
  joinPaths,
  searchToFormData,
  toPath,
  toSearch,
  toURL,
  urlcat,
} from './url'

describe('urlcat', () => {
  test('should concatenate URLs correctly', () => {
    expect(urlcat('http://example.com', '/path1', { q: 'test' })).toEqual(
      'http://example.com/path1?q=test',
    )

    expect(urlcat('http://example.com/', 'path2', { q: 'test' })).toEqual(
      'http://example.com/path2?q=test',
    )

    expect(urlcat('/path1', 'path2', { q: 'test' })).toEqual(
      '/path1/path2?q=test',
    )

    expect(urlcat('/path1/', '/path2/', { q: 'test' })).toEqual(
      '/path1/path2?q=test',
    )
  })

  test('should handle empty paths correctly', () => {
    expect(urlcat('', '', { q: 'test' })).toEqual('/?q=test')
    expect(urlcat('/', '', { q: 'test' })).toEqual('/?q=test')
    expect(urlcat('', '/', { q: 'test' })).toEqual('/?q=test')
    expect(urlcat('', '/')).toEqual('/')
    expect(urlcat('/', '/', {})).toEqual('/')
  })

  test('should handle search parameters correctly', () => {
    expect(urlcat('/path1', 'path2', { q: 'test', p: 'test2' })).toEqual(
      '/path1/path2?q=test&p=test2',
    )

    expect(urlcat('/path1', 'path2', { q: ['test1', 'test2'] })).toEqual(
      '/path1/path2?q=test1&q=test2',
    )

    expect(urlcat('/path1', 'path2')).toEqual('/path1/path2')
  })

  test('should handle array query parameters correctly', () => {
    expect(urlcat('/path1', 'path2', { q: ['test1', 'test2'] })).toEqual(
      '/path1/path2?q=test1&q=test2',
    )
    expect(urlcat('/path1', 'path2', { q: [] })).toEqual('/path1/path2')
  })
})

describe('joinPaths', () => {
  test('should join paths correctly', () => {
    expect(joinPaths(['/path1', 'path2', '/path3'])).toEqual(
      '/path1/path2/path3',
    )
    expect(joinPaths(['path1', 'path2', 'path3'])).toEqual('/path1/path2/path3')
    expect(joinPaths(['/path1/', '/path2/', '/path3/'])).toEqual(
      '/path1/path2/path3',
    )
  })

  test('should return a single slash if no paths are provided', () => {
    expect(joinPaths([])).toEqual('/')
  })

  test('should handle empty paths correctly', () => {
    expect(joinPaths(['', '', ''])).toEqual('/')
    expect(joinPaths(['/path1', '', '/path3'])).toEqual('/path1/path3')
    expect(joinPaths(['/path1/', '/path2/', '/path3/', ''])).toEqual(
      '/path1/path2/path3',
    )
    expect(joinPaths(['', '/path1/', '/path2/', '/path3/', ''])).toEqual(
      '/path1/path2/path3',
    )
  })
})

describe('toSearch', () => {
  test('should convert object to search params correctly', () => {
    expect(toSearch({ q: 'test', p: 'test2' })).toEqual('q=test&p=test2')

    expect(toSearch({ q: ['test1', 'test2'], p: 'test3' })).toEqual(
      'q=test1&q=test2&p=test3',
    )

    expect(toSearch({ q: [100, 200], p: 'test3' })).toEqual(
      'q=100&q=200&p=test3',
    )

    expect(toSearch({})).toEqual('')

    expect(toSearch({ q: [] })).toEqual('')
  })
})

describe('fromSearch', () => {
  test('should convert URLSearchParams to object correctly', () => {
    const searchParams = new URLSearchParams('q=test&p=test2')
    expect(fromSearchParams(searchParams)).toEqual({ q: 'test', p: 'test2' })

    const searchParams2 = new URLSearchParams('q=test1&q=test2&p=test3')
    expect(fromSearchParams(searchParams2)).toEqual({
      q: ['test1', 'test2'],
      p: 'test3',
    })

    const searchParams3 = new URLSearchParams('q=100&q=200&p=test3')
    expect(fromSearchParams(searchParams3)).toEqual({
      q: ['100', '200'],
      p: 'test3',
    })

    const searchParams4 = new URLSearchParams('')
    expect(fromSearchParams(searchParams4)).toEqual({})
  })

  describe('searchToFormData', () => {
    test('should convert URLSearchParams to FormData correctly', () => {
      const searchParams = new URLSearchParams('q=test&p=test2')
      const formData = new FormData()
      formData.append('q', 'test')
      formData.append('p', 'test2')
      expect(searchToFormData(searchParams)).toEqual(formData)

      const searchParams2 = new URLSearchParams('q=test1&q=test2&p=test3')
      const formData2 = new FormData()
      formData2.append('q', 'test1')
      formData2.append('q', 'test2')
      formData2.append('p', 'test3')
      expect(searchToFormData(searchParams2)).toEqual(formData2)

      const searchParams3 = new URLSearchParams('q=100&q=200&p=test3')
      const formData3 = new FormData()
      formData3.append('q', '100')
      formData3.append('q', '200')
      formData3.append('p', 'test3')
      expect(searchToFormData(searchParams3)).toEqual(formData3)

      const searchParams4 = new URLSearchParams('')
      const formData4 = new FormData()
      expect(searchToFormData(searchParams4)).toEqual(formData4)
    })
  })

  describe('formDataToSearch', () => {
    test('should convert FormData to URLSearchParams correctly', () => {
      const formData = new FormData()
      formData.append('q', 'test')
      formData.append('p', 'test2')
      const searchParams = new URLSearchParams('q=test&p=test2')
      expect(formDataToSearch(formData)).toEqual(searchParams)

      const formData2 = new FormData()
      formData2.append('q', 'test1')
      formData2.append('q', 'test2')
      formData2.append('p', 'test3')
      const searchParams2 = new URLSearchParams('q=test1&q=test2&p=test3')
      expect(formDataToSearch(formData2)).toEqual(searchParams2)

      const formData3 = new FormData()
      formData3.append('q', '100')
      formData3.append('q', '200')
      formData3.append('p', 'test3')
      const searchParams3 = new URLSearchParams('q=100&q=200&p=test3')
      expect(formDataToSearch(formData3)).toEqual(searchParams3)

      const formData4 = new FormData()
      const searchParams4 = new URLSearchParams('')
      expect(formDataToSearch(formData4)).toEqual(searchParams4)
    })
  })
})

describe('toPath', () => {
  test('should replace placeholders with values from params', () => {
    const pathTemplate = '/users/:id/posts/:postId'
    const params = { id: 123, postId: 456 }
    expect(toPath(pathTemplate, params)).toEqual('/users/123/posts/456')
  })

  test('should throw error if placeholders are not replaced', () => {
    const pathTemplate = '/users/:id/posts/:postId'
    const params = { id: 123 }
    expect(() => toPath(pathTemplate, params)).toThrow(
      'Missing params for path template',
    )
  })
})

describe('toURL', () => {
  test('should create URL with origin, path, and search', () => {
    const origin = 'https://example.com'
    const path = '/users'
    const search = { q: 'john', page: 1 }
    const url = toURL(origin, path, search)
    expect(url.href).toEqual('https://example.com/users?q=john&page=1')
  })

  test('should create URL with origin and path only', () => {
    const origin = 'https://example.com'
    const path = '/users'
    const url = toURL(origin, path)
    expect(url.href).toEqual('https://example.com/users')
  })

  test('should throw error without origin', () => {
    const path = '/users'
    expect(() => toURL('', path)).toThrow()
  })
})
