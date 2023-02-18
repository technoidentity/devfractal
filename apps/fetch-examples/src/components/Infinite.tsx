import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useInfiniteLoader } from '@srtp/fetch'
import type { Filter, Todo } from '@srtp/todo'
import { filteredTodos } from './common'
import { FilterView, TodoListView } from './components'
import { useInfiniteTodos, useTodoMutations } from './hooks'

export const TodoList = () => {
  const [filter, setFilter] = React.useState<Filter>('All')
  const ref = React.useRef<HTMLDivElement>(null)

  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteTodos()

  const todoList = React.useMemo(
    () =>
      filteredTodos(
        (data?.pages?.flatMap(page => page.data) as Todo[]) || [],
        filter,
      ),
    [data, filter],
  )

  useInfiniteLoader(
    ref,
    React.useCallback(() => {
      fetchNextPage().catch(err => console.error(err))
    }, [fetchNextPage]),
  )

  const { deleteTodo, toggleTodo } = useTodoMutations()

  return (
    <Box p="5">
      <FilterView filter={filter} onFilterChange={setFilter} />

      <TodoListView
        todoList={todoList}
        onDelete={deleteTodo.mutate}
        onToggle={toggleTodo.mutate}
      />

      {hasNextPage && (
        <div ref={ref}>
          <Button
            disabled={isFetchingNextPage}
            onClick={() => {
              fetchNextPage().catch(err => console.error(err))
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </Box>
  )
}
