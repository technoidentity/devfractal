import { useOptimistic, useOptimisticValue } from '@srtp/query'
import { useQuery } from '@tanstack/react-query'
import invariant from 'tiny-invariant'
import type { Todo } from './todo'
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
  return useOptimistic<Todo, string, Todo[]>(
    ['todos'],
    title => todoApi.post({ title, completed: false }),
    (draft, title) => {
      draft.push({ id: dummyID--, title, completed: false })
    },
  )
}

export function useToggle() {
  return useOptimisticValue(
    ['todos'],
    (todo: Todo) => todoApi.patch({ ...todo, completed: !todo.completed }),
    (old: Todo[], todo) =>
      old.map(t => (t.id === todo.id ? { ...t, completed: !t.completed } : t)),
  )
}

export function useDelete() {
  return useOptimisticValue(
    ['todos'],
    (id: number) => todoApi.delete({ id }),
    (old: Todo[], id: number) => old.filter(todo => todo.id !== id),
  )
}
