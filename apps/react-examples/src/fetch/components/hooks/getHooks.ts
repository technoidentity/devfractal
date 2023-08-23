import type { QueryFunctionContext } from '@tanstack/react-query'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import type { Todo } from '@srtp/todo'
import { axios, urlcat } from '@srtp/web'
import { itemCount, limit, pageCount } from '../common'
import { rqGet } from '../get'

export const getPagedTodos = async ({
  queryKey,
}: QueryFunctionContext<[string, number, number?]>) => {
  const [data, res] = await axios({
    method: 'get',
    url: urlcat(`api/todos?`, '', {
      _page: queryKey[1],
      _limit: queryKey[2] || limit,
    }),
  })

  const ic = itemCount(res)

  return {
    page: data as Todo[],
    pageCount: pageCount(ic, limit),
    itemCount: ic,
  }
}

const getInfiniteTodos = async ({ pageParam = 1 }) => {
  const [data, res] = await axios({
    method: 'get',
    url: urlcat(`api/todos`, '', { _limit: limit, _page: pageParam }),
  })

  const ic = itemCount(res)
  return {
    data: data as Todo[],
    itemCount: ic,
    pageCount: pageCount(ic, limit),
  }
}

export const useTodos = () => useQuery({ queryKey: ['todos'], queryFn: rqGet })

export const usePagedTodos = (page: number) =>
  useQuery({
    queryKey: ['todos', page],
    queryFn: getPagedTodos,
    keepPreviousData: true,
  })

export const useInfiniteTodos = () =>
  useInfiniteQuery(['todos'], getInfiniteTodos, {
    getNextPageParam: (page, lastPages) =>
      lastPages.length <= page.pageCount ? lastPages.length + 1 : undefined,
  })
