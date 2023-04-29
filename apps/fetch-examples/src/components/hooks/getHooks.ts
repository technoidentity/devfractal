import type { QueryFunctionContext } from '@tanstack/react-query'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import qs from 'query-string'
import axios from 'redaxios'

import type { Todo } from '@srtp/todo'
import { itemCount, limit, pageCount } from '../common'
import { rqGet } from '../get'

export const getPagedTodos = async ({
  queryKey,
}: QueryFunctionContext<[string, number, number?]>) => {
  const q = qs.stringify({ _page: queryKey[1], _limit: queryKey[2] || limit })

  const res = await axios.get(`api/todos?${q}`)

  const ic = itemCount(res)

  return {
    page: res.data as Todo[],
    pageCount: pageCount(ic, limit),
    itemCount: ic,
  }
}

const getInfiniteTodos = async ({ pageParam = 1 }) => {
  const q = qs.stringify({ _limit: limit, _page: pageParam })
  const res = await axios.get(`api/todos?${q}`)

  const ic = itemCount(res)
  return {
    data: res.data,
    itemCount: ic,
    pageCount: pageCount(ic, limit),
  }
}

export const useTodos = () => useQuery(['todos'], rqGet)

export const usePagedTodos = (page: number) =>
  useQuery(['todos', page], getPagedTodos, { keepPreviousData: true })

export const useInfiniteTodos = () =>
  useInfiniteQuery(['todos'], getInfiniteTodos, {
    getNextPageParam: (page, lastPages) =>
      lastPages.length <= page.pageCount ? lastPages.length + 1 : undefined,
  })
