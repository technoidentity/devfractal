import { usePatch, usePost, useDelete } from '@srtp/query'
import { useQuery } from '@tanstack/react-query'
import invariant from 'tiny-invariant'
import { z } from 'zod'

import { Todo } from './todo'
import type { Update } from './todoApi'
import { todoApi } from './todoApi'

export function useTodoList() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoApi.getAll(),
  })

  invariant(result.status === 'success', 'should be success')
  return result
}

export function useAddTodo() {
  return usePost(Todo, ['todos'], (todo: Omit<Todo, 'id'>) =>
    todoApi.post({ title: todo.title, completed: false }),
  )
}

export function useToggleTodo() {
  return usePatch(Todo, ['todos'], (todo: Update<Todo>) =>
    todoApi.patch({ ...todo, completed: !todo.completed }),
  )
}

export function useDeleteTodo() {
  return useDelete(z.any(), ['todos'], (id: number) => todoApi.delete({ id }))
}
