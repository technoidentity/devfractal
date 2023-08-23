import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import invariant from 'tiny-invariant'
import { Pagination, TodoListView } from './components'
import { usePagedTodos, useTodoMutations } from './hooks'
import { isDefined } from '@srtp/core'

export const TodoList = () => {
  const [page, setPage] = React.useState(1)
  const { data, isPreviousData } = usePagedTodos(page)
  const { deleteTodo, toggleTodo } = useTodoMutations()

  invariant(isDefined(data))

  return (
    <Flex direction="column" h="100vh" p="5">
      <TodoListView
        todoList={data.page}
        onDelete={deleteTodo.mutate}
        onToggle={toggleTodo.mutate}
      />
      <Pagination
        current={page}
        pageCount={data.pageCount}
        onPageChange={setPage}
      />
      {isPreviousData && <Spinner />}
    </Flex>
  )
}
