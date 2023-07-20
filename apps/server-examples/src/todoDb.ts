import { faker } from '@faker-js/faker'
import {} from '@srtp/endpoint'
import { boolean, number, string } from '@srtp/validator'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import { applyFilters } from './utils'

export const Todo = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
export type Todo = z.infer<typeof Todo>

export const Filters = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})
export type Filters = z.infer<typeof Filters>

const todoTable = new Map<number, Todo>()

let nextId: number
export function initializeFakeTodoTable(N = 100) {
  for (let i = 0; i < N; i++) {
    todoTable.set(i, {
      id: i,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    })
  }
  nextId = N
}

export const todoList = (filters: Filters) =>
  applyFilters(todoTable.values(), filters)

export const createTodo = (todo: Omit<Todo, 'id'>): Todo => {
  const id = nextId++
  const result = { id, ...todo }
  todoTable.set(id, result)

  return result
}

export const replaceTodo = (id: number, todo: Todo) => {
  invariant(id === todo.id, 'id in path and body must match')

  if (!todoTable.has(id)) {
    return undefined
  }

  todoTable.set(id, todo)
  return todo
}

export const updateTodo = (id: number, todo: Partial<Todo>) => {
  const existing = todoTable.get(id)
  if (!existing) {
    return undefined
  }

  const updated = { ...existing, ...todo }
  todoTable.set(id, updated)
  return updated
}

export const deleteTodo = (id: number) => {
  const todo = todoTable.get(id)
  if (!todo) {
    return undefined
  }

  todoTable.delete(id)
  return todo
}
