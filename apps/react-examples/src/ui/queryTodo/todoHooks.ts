import { useSafeQuery } from '@srtp/fetch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Todo } from './todo'
import { TodoList } from './todo'
import { todoApi } from './todoApi'

export function useTodoList() {
  return useSafeQuery({
    paths: ['todos'],
    spec: TodoList,
    queryFn: () => todoApi.getAll(),
  })
}

let dummyID = -1
export function useAddTodo() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (title: string) => todoApi.post({ title, completed: false }),
    onMutate: async (title: string) => {
      await queryClient.cancelQueries(['todos'])
      const previous = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => [
        ...(old || []),
        { id: dummyID--, title, completed: false },
      ])
      return { previous }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previous)
    },
    // on sucess replace previous dummy todo with actual todo
    onSuccess: (todo, _) => {
      queryClient.setQueryData(
        ['todos'],
        (old: Todo[] | undefined) =>
          old?.map(t => (t.id === todo.id ? todo : t)) ?? [],
      )
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

export function useToggle() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (todo: Todo) =>
      todoApi.patch({ ...todo, completed: !todo.completed }),
    onMutate: async (todo: Todo) => {
      await queryClient.cancelQueries(['todos'])
      const previous = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(
        ['todos'],
        (old: Todo[] | undefined) =>
          old?.map(t =>
            t.id === todo.id ? { ...t, completed: !t.completed } : t,
          ) || [],
      )
      return { previous }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previous)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

export function useDelete(id: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: () => todoApi.delete({ id }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(['todos'])
      const previous = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(
        ['todos'],
        (old: Todo[] | undefined) => old?.filter(todo => todo.id !== id) || [],
      )
      return { previous }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previous)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation]
}
