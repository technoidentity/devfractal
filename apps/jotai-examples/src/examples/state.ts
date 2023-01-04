import { Draft } from 'immer'

import {
  createTodo,
  CreateTodo,
  Filter,
  initialState,
  State,
  Todo,
} from '@srtp/todo'
import {
  computed,
  signal,
  useAction,
  useActionHook,
  useValue,
} from '@srtp/jotai'

const filterAtom = signal<Filter>('All')

export const useFilterValue = () => {
  return useValue(filterAtom)
}

export const useUpdateFilter = () => {
  return useAction(filterAtom)
}

const todosAtom = signal(initialState.todos)
const useTodoAction = <P extends any[]>(
  fn: (draft: Draft<State['todos']>, ...args: P) => void,
) => useActionHook(todosAtom, fn)

export const useCreate = () =>
  useTodoAction((draft, todo: CreateTodo) => {
    const created = createTodo(todo)
    draft.set(created.id, created)
  })

export const useDelete = () =>
  useTodoAction((draft, id: number) => {
    draft.delete(id)
  })

export const useEdit = () =>
  useTodoAction((draft, todo: Todo) => {
    const editTodo = draft.get(todo.id)
    draft.set(todo.id, { ...editTodo, ...todo })
  })

export const useToggle = () =>
  useTodoAction((draft, id: number) => {
    const toggleTodo = draft.get(id)
    if (toggleTodo) {
      toggleTodo.completed = !toggleTodo.completed
    }
  })

const filteredTodosAtom = computed(get => {
  const todoList = Array.from(get(todosAtom).values())
  const filter = get(filterAtom)

  return filter === 'All'
    ? todoList
    : filter === 'Completed'
    ? todoList.filter(t => t.completed)
    : todoList.filter(t => !t.completed)
})

export const useFilteredTodos = () => {
  return useValue(filteredTodosAtom)
}
