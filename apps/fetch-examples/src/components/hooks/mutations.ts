// Mutations

import type { Todo } from '@srtp/todo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import axios from 'redaxios'

export const del = async (todoId: number) =>
  (await axios.delete(`/api/todos/${todoId}`)).data

export const toggle = async (todo: Todo) =>
  (
    await axios.patch(`/api/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    })
  ).data

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
