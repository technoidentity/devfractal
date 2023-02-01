/* eslint-disable @typescript-eslint/no-misused-promises */
import { Box, Flex, Heading, Spinner } from '@chakra-ui/react'
import { paged } from '@srtp/core'
import { Filter, Todo } from '@srtp/todo'
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { Suspense, useTransition } from 'react'
import axios from 'redaxios'
import { filteredTodos, pageCount } from '../common'
import { FilterView, Pagination, TodoListView } from '../components'

const limitAtom = atom(15)
const pageAtom = atom(1)

const filterAtom = atom('All' as Filter, async (get, set, _: Filter) => {
  await set(filterAtom, _)

  if (get(pageAtom) > (await get(pageCountAtom))) {
    set(pageAtom, await get(pageCountAtom))
  }
})

const [todosAtom] = atomsWithQuery(() => {
  return {
    queryKey: ['todos'],
    queryFn: async () =>
      (await axios.get(`/api/todos`)).data as readonly Todo[],
  }
})

const filteredTodosAtom = atom(async get =>
  filteredTodos(await get(todosAtom), get(filterAtom)),
)

const todoListAtom = atom(async get =>
  paged(await get(filteredTodosAtom), get(pageAtom), get(limitAtom)),
)

const pageCountAtom = atom(async get =>
  pageCount((await get(filteredTodosAtom)).length, get(limitAtom)),
)

const TodoListComp = () => {
  const todoList = useAtomValue(todoListAtom)

  return <TodoListView todoList={todoList} />
}

export const TodoList = () => {
  const [isPending, startTransition] = useTransition()

  const pageCount = useAtomValue(pageCountAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [filter, setFilter] = useAtom(filterAtom)

  return (
    <Flex direction="column" h="100vh" p="5">
      <Flex direction="row">
        <FilterView filter={filter} onFilterChange={setFilter} />
        {isPending && <Spinner />}
      </Flex>

      <Box flexGrow={1}>
        <Suspense fallback={<Heading>Loading...</Heading>}>
          <TodoListComp />
        </Suspense>
      </Box>
      <Pagination
        current={page}
        pageCount={pageCount}
        onPageChange={page => startTransition(() => setPage(page))}
      />
    </Flex>
  )
}
