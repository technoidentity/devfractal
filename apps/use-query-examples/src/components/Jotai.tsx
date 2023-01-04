import { Box, Flex, Spinner } from '@chakra-ui/react'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import qs from 'query-string'
import React, { Suspense, useTransition } from 'react'
import axios from 'redaxios'
import { Filter, Todo } from '@srtp/todo'
import { itemCount, pageCount } from './common'
import { FilterView, Pagination, TodoListView } from './components'

const limitAtom = atom(15)
const pageAtom = atom(1)
const filterAtom = atom<Filter>('All')

const [resAtom] = atomsWithQuery(get => ({
  queryKey: ['todos', get(pageAtom), get(limitAtom), get(filterAtom)],

  queryFn: async ({ queryKey: [, page, limit, filter] }) => {
    const completed =
      filter === 'All' ? undefined : filter === 'Completed' ? true : false
    const q = qs.stringify({ _limit: limit, _page: page, completed })

    const res = await axios.get(`api/todos?${q}`)
    const data = res.data as readonly Todo[]

    const ic = itemCount(res)
    return { data, itemCount: ic, pageCount: pageCount(ic, Number(limit)) }
  },
}))

const todoListAtom = atom(get => get(resAtom).data)

const pageCountAtom = atom(get => get(resAtom).pageCount)

export const TodoListComp = () => {
  const todoList = useAtomValue(todoListAtom)
  return <TodoListView todoList={todoList} />
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
    (filter: Filter) => {
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
