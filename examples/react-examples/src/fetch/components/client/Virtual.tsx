import { Flex } from '@chakra-ui/react'
import { isDefined, isUndefined } from '@srtp/core'
import type { Task, TaskFilter } from '@srtp/fake-tasks'
import React from 'react'
import invariant from 'tiny-invariant'

import { filteredTodos } from '../common'
import { FilterView, VirtualTodoListView } from '../components'
import { useTodoMutations, useTodos } from '../hooks'

const useTodoList = () => {
  const [filter, setFilter] = React.useState<TaskFilter>('All')

  const { data } = useTodos()

  const todoList = React.useMemo(
    () =>
      isUndefined(data) ? undefined : filteredTodos(data as Task[], filter),
    [data, filter],
  )

  const { deleteTodo, toggleTodo } = useTodoMutations()

  return {
    itemCount: todoList?.length || 0,
    todoList,

    filter,
    onFilterChange: React.useCallback(
      (s: string) => setFilter(s as TaskFilter),
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

  invariant(isDefined(todoList), 'todoList is undefined')

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
