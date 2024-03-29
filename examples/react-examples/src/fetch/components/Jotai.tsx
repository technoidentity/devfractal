import { Box, Flex, Spinner } from '@chakra-ui/react'
import type { Task, TaskFilter } from '@srtp/fake-tasks'
import { axios, urlcat } from '@srtp/web'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import React, { Suspense, useTransition } from 'react'

import { itemCount, pageCount } from './common'
import { FilterView, Pagination, TodoListView } from './components'

const limitAtom = atom(15)
const pageAtom = atom(1)
const filterAtom = atom<TaskFilter>('All')

const [resAtom] = atomsWithQuery(get => ({
  queryKey: ['todos', get(pageAtom), get(limitAtom), get(filterAtom)],

  queryFn: async ({ queryKey: [, page, limit, filter] }) => {
    const completed = filter === 'All' ? undefined : filter === 'Completed'

    const { data, response } = await axios({
      method: 'get',
      url: urlcat('api/todos', '', { _limit: limit, _page: page, completed }),
    })

    const ic = itemCount(response)
    return { data, itemCount: ic, pageCount: pageCount(ic, Number(limit)) }
  },
}))

const todoListAtom = atom(async get => (await get(resAtom)).data)

const pageCountAtom = atom(async get => (await get(resAtom)).pageCount)

export const TodoListComp = () => {
  const todoList = useAtomValue(todoListAtom)
  return <TodoListView todoList={todoList as Task[]} />
}

export const TodoList = () => {
  const [isPending, startTransition] = useTransition()

  const pageCount = useAtomValue(pageCountAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [filter, setFilter] = useAtom(filterAtom)

  React.useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount)
    }
  }, [page, pageCount, setPage])

  const handleFilterChange = React.useCallback(
    (filter: TaskFilter) => {
      startTransition(() => {
        setFilter(filter)
      })
    },
    [setFilter],
  )

  const handlePageChange = React.useCallback(
    (page: number) => {
      startTransition(() => setPage(page))
    },
    [setPage],
  )

  return (
    <Flex direction="column" h="100vh" p="5">
      <Flex direction="row">
        <FilterView filter={filter} onFilterChange={handleFilterChange} />
        {isPending && <Spinner />}
      </Flex>

      <Box flexGrow={1}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <TodoListComp />
        </Suspense>
      </Box>
      <Pagination
        current={page}
        pageCount={pageCount}
        onPageChange={handlePageChange}
      />
    </Flex>
  )
}
