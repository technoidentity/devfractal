import { faker } from '@faker-js/faker'
import invariant from 'tiny-invariant'

import type { Search, Task } from './specs'
import { applySearch } from './utils'

const tasksTable = new Map<number, Task>()

let nextId: number
export function seedTasks(N = 10) {
  for (let i = 0; i < N; i++) {
    tasksTable.set(i, {
      id: i,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    })
  }
  nextId = N
}

export const tasksList = (filters: Search) =>
  applySearch(tasksTable.values(), filters)

export const createTask = (task: Omit<Task, 'id'>): Task => {
  const id = nextId++
  const result = { id, ...task }
  tasksTable.set(id, result)

  return result
}

export const replaceTask = (id: number, task: Task) => {
  invariant(id === task.id, 'id in path and body must match')

  if (!tasksTable.has(id)) {
    return undefined
  }

  tasksTable.set(id, task)
  return task
}

export const updateTask = (id: number, task: Partial<Task>) => {
  const existing = tasksTable.get(id)
  if (!existing) {
    return undefined
  }

  const updated = { ...existing, ...task }
  tasksTable.set(id, updated)
  return updated
}

export const removeTask = (id: number) => {
  const task = tasksTable.get(id)
  if (!task) {
    return undefined
  }

  tasksTable.delete(id)

  return task
}
