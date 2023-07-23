// Mutations

import type { Todo } from '@srtp/todo'
import { axios } from '@srtp/web'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

export const del = async (todoId: number) =>
  (await axios({ method: 'delete', url: `/api/todos/${todoId}` }))[0]

export const toggle = async (todo: Todo) =>
  (
    await axios({
      method: 'patch',
      url: `/api/todos/${todo.id}`,
      body: { ...todo, completed: !todo.completed },
    })
  )[0]

const useInvalidateTodos = () => {
  const queryClient = useQueryClient()

  return React.useMemo(
    () => ({
      onSuccess: () => {
        queryClient
          .invalidateQueries(['todos'])
          .catch(err => console.error(err))
      },
    }),
    [queryClient],
  )
}

export const useTodoMutations = () => {
  const invalidateTodos = useInvalidateTodos()
  const deleteTodo = useMutation(del, invalidateTodos)
  const toggleTodo = useMutation(toggle, invalidateTodos)

  if (deleteTodo.error || toggleTodo.error) {
    console.error({
      deleteError: deleteTodo.error,
      toggleTodoError: toggleTodo.error,
    })
  }

  return { deleteTodo, toggleTodo }
}
