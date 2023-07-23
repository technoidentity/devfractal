import { fromSearch } from './url'
import { describe, expect, test } from 'vitest'
import { joinPaths, toSearchParams, urlcat } from './url'

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
    expect(joinPaths('/path1', 'path2', '/path3')).toEqual('/path1/path2/path3')
    expect(joinPaths('path1', 'path2', 'path3')).toEqual('/path1/path2/path3')
    expect(joinPaths('/path1/', '/path2/', '/path3/')).toEqual(
      '/path1/path2/path3',
    )
  })

  test('should return a single slash if no paths are provided', () => {
    expect(joinPaths()).toEqual('/')
  })

  test('should handle empty paths correctly', () => {
    expect(joinPaths('', '', '')).toEqual('/')
    expect(joinPaths('/path1', '', '/path3')).toEqual('/path1/path3')
    expect(joinPaths('/path1/', '/path2/', '/path3/', '')).toEqual(
      '/path1/path2/path3',
    )
    expect(joinPaths('', '/path1/', '/path2/', '/path3/', '')).toEqual(
      '/path1/path2/path3',
    )
  })
})

describe('toSearchParams', () => {
  test('should convert object to search params correctly', () => {
    expect(toSearchParams({ q: 'test', p: 'test2' }).toString()).toEqual(
      'q=test&p=test2',
    )

    expect(
      toSearchParams({ q: ['test1', 'test2'], p: 'test3' }).toString(),
    ).toEqual('q=test1&q=test2&p=test3')

    expect(toSearchParams({ q: [100, 200], p: 'test3' }).toString()).toEqual(
      'q=100&q=200&p=test3',
    )

    expect(toSearchParams({}).toString()).toEqual('')

    expect(toSearchParams({ q: [] }).toString()).toEqual('')
  })
})

describe('fromSearch', () => {
  test('should convert URLSearchParams to object correctly', () => {
    const searchParams = new URLSearchParams('q=test&p=test2')
    expect(fromSearch(searchParams)).toEqual({ q: 'test', p: 'test2' })

    const searchParams2 = new URLSearchParams('q=test1&q=test2&p=test3')
    expect(fromSearch(searchParams2)).toEqual({
      q: ['test1', 'test2'],
      p: 'test3',
    })

    const searchParams3 = new URLSearchParams('q=100&q=200&p=test3')
    expect(fromSearch(searchParams3)).toEqual({
      q: ['100', '200'],
      p: 'test3',
    })

    const searchParams4 = new URLSearchParams('')
    expect(fromSearch(searchParams4)).toEqual({})
  })
})
