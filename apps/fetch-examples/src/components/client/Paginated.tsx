import { Box, Flex } from '@chakra-ui/react'
import { paged } from '@srtp/core'
import { Filter } from '@srtp/todo'
import React from 'react'
import invariant from 'tiny-invariant'
import { filteredTodos, pageCount } from '../common'
import { useTodoMutations, useTodos } from '../hooks'

import { FilterView, Pagination, TodoListView } from '../components'

const useTodoList = () => {
  const [limit] = React.useState(15)
  const [filter, setFilter] = React.useState<Filter>('All')
  const [page, setPage] = React.useState(1)

  const { data } = useTodos()

  const filtered = React.useMemo(
    () => (data === undefined ? undefined : filteredTodos(data, filter)),

    [data, filter],
  )

  const todoList = React.useMemo(
    () => (filtered === undefined ? undefined : paged(filtered, page, limit)),
    [filtered, page, limit],
  )

  const { deleteTodo, toggleTodo } = useTodoMutations()

  const pc = pageCount(filtered?.length || 0, limit)

  React.useEffect(() => {
    if (page > pc) {
      setPage(pc)
    }
  }, [page, pc])

  const onFilterChange = React.useCallback(
    (s: string) => setFilter(s as Filter),
    [],
  )

  return {
    todoList,
    pageCount: pc,
    page,
    onPageChange: setPage,

    filter,
    onFilterChange,
    onDelete: deleteTodo.mutate,
    onToggle: toggleTodo.mutate,
  } as const
}

export const TodoList = () => {
  const {
    todoList,
    pageCount,

    filter,
    page,

    ...actions
  } = useTodoList()

  invariant(todoList !== undefined, 'todoList is undefined')

  return (
    <Flex direction="column" h="100vh" p="5">
      <FilterView filter={filter} onFilterChange={actions.onFilterChange} />

      <Box flexGrow={1}>
        <TodoListView
          todoList={todoList}
          onDelete={actions.onDelete}
          onToggle={actions.onToggle}
        />
      </Box>

      <Pagination
        current={page}
        pageCount={pageCount}
        onPageChange={actions.onPageChange}
      />
    </Flex>
  )
}
