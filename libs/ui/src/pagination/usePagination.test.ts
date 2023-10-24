import { renderHook, act } from '@testing-library/react'
import { expect, expectTypeOf, test, describe } from 'vitest'

import {
  usePagination,
  type PaginationResult,
  type PaginationValues,
} from './usePagination'

describe('usePagination hook', () => {
  test('usePagination without initialPage prop', () => {
    const { result } = renderHook<PaginationResult, PaginationValues>(() =>
      usePagination({ totalPages: 10 }),
    )

    expect(result.current.activePage).toEqual(1)
    expect(result.current.totalPages).toEqual(10)

    expectTypeOf(result.current).toMatchTypeOf<PaginationResult>()

    act(() => {
      result.current.next()
    })
    expect(result.current.activePage).toEqual(2)

    act(() => {
      result.current.last()
    })
    expect(result.current.activePage).toEqual(10)

    act(() => {
      result.current.previous()
    })
    expect(result.current.activePage).toEqual(9)

    act(() => {
      result.current.first()
    })
    expect(result.current.activePage).toEqual(1)
  })

  test('usePagination with initialPage prop', () => {
    const { result } = renderHook<PaginationResult, PaginationValues>(() =>
      usePagination({ initialPage: 3, totalPages: 5 }),
    )

    expect(result.current.activePage).toEqual(3)
    expect(result.current.totalPages).toEqual(5)

    expectTypeOf(result.current).toMatchTypeOf<PaginationResult>()

    act(() => {
      result.current.next()
    })
    expect(result.current.activePage).toEqual(4)

    act(() => {
      result.current.last()
    })
    expect(result.current.activePage).toEqual(5)

    act(() => {
      result.current.previous()
    })
    expect(result.current.activePage).toEqual(4)

    act(() => {
      result.current.first()
    })
    expect(result.current.activePage).toEqual(1)
  })
})
