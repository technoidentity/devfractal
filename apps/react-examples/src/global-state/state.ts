import { toArray } from '@srtp/fn'
import type { Getter } from '@srtp/react'
import { atomWithHooks, useAction, useValue } from '@srtp/react'
import type { CreateTodo, Filter, State, Todo } from '@srtp/todo'
import { createTodo, initialState } from '@srtp/todo'
import type { Draft } from 'immer'
import { atom } from 'jotai'

const filterAtom = atom<Filter>('All')

export const useFilterValue = () => {
  return useValue(filterAtom)
}

export const useUpdateFilter = () => {
  return useAction(filterAtom)
}

type TodoState = State['todos']
const [todosAtom, useTodoAction, useTodoValue] = atomWithHooks(
  initialState.todos,
)

const createTodoAction = (draft: Draft<TodoState>, todo: CreateTodo) => {
  const created = createTodo(todo)
  draft.set(created.id, created)
}

export const useCreate = () => useTodoAction(createTodoAction)

export const useDelete = () =>
  useTodoAction((draft, id: number) => {
    draft.delete(id)
  })

export const useEdit = () =>
  useTodoAction((draft, todo: Todo) => {
    const editTodo = draft.get(todo.id)
    draft.set(todo.id, { ...editTodo, ...todo })
  })

const toggle = (draft: Draft<TodoState>, id: number) => {
  const toggleTodo = draft.get(id)
  if (toggleTodo) {
    toggleTodo.completed = !toggleTodo.completed
  }
}

export const useToggle = () => useTodoAction(toggle)

const filtered = (get: Getter) => {
  const todoList = toArray(get(todosAtom).values())
  const filter = get(filterAtom)

  return filter === 'All'
    ? todoList
    : filter === 'Completed'
    ? todoList.filter(t => t.completed)
    : todoList.filter(t => !t.completed)
}

// these hooks are to compute values, SHOULD NOT take any parameters
// Must always pass the same function to useTodoValue
export const useFilteredTodos = () => useTodoValue(filtered)