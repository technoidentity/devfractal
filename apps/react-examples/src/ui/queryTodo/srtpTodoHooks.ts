import type { QueryClient } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import invariant from 'tiny-invariant'
import { todoApi } from './todoApi'
import type { Todo } from './todo'

export function useTodoList() {
  const result = useQuery({
    queryKey: ['todos'],
    queryFn: () => todoApi.getAll(),
  })

  invariant(result.status === 'success', 'should be success')
  return result
}

let dummyID = -1
export function useAddTodo(queryClient: QueryClient) {
  const mutation = useMutation({
    mutationFn: (title: string) => todoApi.post({ title, completed: false }),
    onMutate: async (title: string) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old => [
        ...(old as Todo[]),
        { id: dummyID--, title, completed: false },
      ])
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    // on sucess replace previous dummy todo with actual todo
    onSuccess: (todo, _) => {
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).map(t => (t.id === todo.id ? todo : t)),
      )
    },

    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

export function useToggle(queryClient: QueryClient) {
  const mutation = useMutation({
    mutationFn: (todo: Todo) =>
      todoApi.patch({ ...todo, completed: !todo.completed }),
    onMutate: async (todo: Todo) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).map(t =>
          t.id === todo.id ? { ...t, completed: !t.completed } : t,
        ),
      )
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation] as const
}

export function useDelete(queryClient: QueryClient, id: number) {
  const mutation = useMutation({
    mutationFn: () => todoApi.delete({ id }),
    onMutate: async (id: number) => {
      await queryClient.cancelQueries(['todos'])
      const previousTodos = queryClient.getQueryData(['todos'])
      queryClient.setQueryData(['todos'], old =>
        (old as Todo[]).filter(todo => todo.id !== id),
      )
      return { previousTodos }
    },
    onError: (err, _, context) => {
      console.error(err)

      queryClient.setQueryData(['todos'], context?.previousTodos)
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['todos'])
    },
  })

  return [mutation.mutate, mutation]
}
