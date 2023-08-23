/* eslint-disable @typescript-eslint/naming-convention */
import { atom } from 'jotai'
import type { Filter, Todo } from './types'
import { computed } from '@srtp/react'
import { action } from '@srtp/react'
import { exhaustive } from 'exhaustive'

const todoList: readonly Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Learn Chakra UI', completed: false },
  { id: 3, text: 'Learn React Query', completed: false },
  { id: 4, text: 'Learn React Router', completed: false },
]

const todoListAtom = atom(todoList)

export const filterAtom = atom<Filter>('All')

export const filteredTodosAtom = computed(get => {
  const filter = get(filterAtom)
  const todoList = get(todoListAtom)

  return exhaustive(filter, {
    All: () => todoList,
    Active: () => todoList.filter(todo => !todo.completed),
    Completed: () => todoList.filter(todo => todo.completed),
  })
})

export const toggleAtom = action(todoListAtom, ({ state }, id: number) => {
  const todo = state.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
})

let nextID = 100
export const addTodoAtom = action(todoListAtom, ({ state }, text: string) => {
  state.push({ id: nextID++, text, completed: false })
})
