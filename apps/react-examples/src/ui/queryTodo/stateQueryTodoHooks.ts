import { useDescribeMutation, useSafeQuery } from '@srtp/query'
import invariant from 'tiny-invariant'
import { TodoList, type Todo } from './todo'
import { todoApi } from './todoApi'
import { current } from 'immer'

const todosPath = '/api/todos'
export function useTodoList() {
  return useSafeQuery({
    paths: ['todos'],
    spec: TodoList,
    queryFn: () => todoApi.getAll(),
  })
}

let dummyID = -1
export function useAddTodo() {
  return useDescribeMutation<Omit<Todo, 'id'>, string, Todo[]>(
    ['todos'],
    (draft, { post }, title) => {
      draft.push({ id: dummyID--, title, completed: false })

      return post(`${todosPath}`, { title, completed: false })
    },
  )
}

export function useToggle() {
  return useDescribeMutation<Todo, number, Todo[]>(
    ['todos'],
    (old: Todo[], { patch }, id: number) => {
      const todo = old.find(t => t.id === id)
      invariant(todo, 'todo should exist')
      todo.completed = !todo.completed

      return patch(`${todosPath}/${todo.id}`, current(todo))
    },
  )
}

export function useDelete() {
  return useDescribeMutation<undefined, number, Todo[]>(
    ['todos'],
    (old, { remove }, id: number) => {
      const index = old.findIndex(t => t.id === id)
      invariant(index >= 0, 'todo should exist')
      old.splice(index, 1)

      return remove(`${todosPath}/${id}`)
    },
  )
}
