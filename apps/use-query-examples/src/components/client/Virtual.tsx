import { Flex } from '@chakra-ui/react'
import { Filter } from '@srtp/todo'
import React from 'react'
import invariant from 'tiny-invariant'
import { filteredTodos } from '../common'
import { useTodoMutations, useTodos } from '../hooks'

import { FilterView } from '../components'
import { VirtualTodoListView } from '../components/VirtualTodoListView'

const useTodoList = () => {
  const [filter, setFilter] = React.useState<Filter>('All')

  const { data } = useTodos()

  const todoList = React.useMemo(
    () => (data === undefined ? undefined : filteredTodos(data, filter)),
    [data, filter],
  )

  const { deleteTodo, toggleTodo } = useTodoMutations()

  return {
    itemCount: todoList?.length || 0,
    todoList,

    filter,
    onFilterChange: React.useCallback(
      (s: string) => setFilter(s as Filter),
      [],
    ),

    onDelete: deleteTodo.mutate,
    onToggle: toggleTodo.mutate,
  } as const
}

export const TodoList = () => {
  const {
    todoList,
    itemCount,

    filter,

    ...actions
  } = useTodoList()

  invariant(todoList !== undefined, 'todoList is undefined')

  return (
    <Flex direction="column" h="90vh">
      <FilterView filter={filter} onFilterChange={actions.onFilterChange} />

      <VirtualTodoListView
        todoList={todoList}
        itemCount={itemCount}
        onDelete={actions.onDelete}
        onToggle={actions.onToggle}
      />
    </Flex>
  )
}
