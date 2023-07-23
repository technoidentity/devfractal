// Mutations

import { useEvent } from '@srtp/react'
import type { Todo } from '@srtp/todo'
import { axios } from '@srtp/web'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

  return useEvent(() => {
    queryClient.invalidateQueries(['todos']).catch(err => console.error(err))
  })
}

export const useTodoMutations = () => {
  const onSettled = useInvalidateTodos()
  const deleteTodo = useMutation({ mutationFn: del, onSettled })
  const toggleTodo = useMutation({ mutationFn: toggle, onSettled })

  if (deleteTodo.error || toggleTodo.error) {
    console.error({
      deleteError: deleteTodo.error,
      toggleTodoError: toggleTodo.error,
    })
  }

  return { deleteTodo, toggleTodo }
}
