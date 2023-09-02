import { useSafeMutation } from '@srtp/query'
import { useQuery } from '@tanstack/react-query'
import { type Draft } from 'immer'
import invariant from 'tiny-invariant'

import { z } from 'zod'
import { Todo } from './todo'
import { todoApi } from './todoApi'

export function useTodoList() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoApi.getAll(),
  })

  invariant(result.status === 'success', 'should be success')
  return result
}

let dummyID = -1
export function useAddTodo() {
  return useSafeMutation(
    Todo,
    (title: string) => todoApi.post({ title, completed: false }),
    {
      invalidateQuery: ['todos'],
      setData: (draft: Draft<Todo[]>, title) => {
        draft.push({ id: dummyID--, title, completed: false })
      },
    },
  )
}

export function useToggle() {
  return useSafeMutation(
    Todo,
    (todo: Todo) => todoApi.patch({ ...todo, completed: !todo.completed }),
    {
      invalidateQuery: ['todos'],
      setData: (old: Todo[], todo) =>
        old.map(t =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t,
        ),
    },
  )
}

export function useDelete() {
  return useSafeMutation(z.any(), (id: number) => todoApi.delete({ id }), {
    invalidateQuery: ['todos'],
    setData: (old: Todo[], id: number) => old.filter(todo => todo.id !== id),
  })
}
