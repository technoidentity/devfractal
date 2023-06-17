import { atom } from 'jotai'
import type { Filter, Todo } from './types'
import { computed } from '@srtp/global-state'
import { action } from '@srtp/global-state'

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

  switch (filter) {
    case 'All':
      return todoList
    case 'Active':
      return todoList.filter(todo => !todo.completed)
    case 'Completed':
      return todoList.filter(todo => todo.completed)
  }
})

export const toggleAtom = action(todoListAtom, (_, state, id: number) => {
  const todo = state.find(todo => todo.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
})

let nextID = 100
export const addTodoAtom = action(todoListAtom, (_, state, text: string) => {
  state.push({ id: nextID++, text, completed: false })
})
