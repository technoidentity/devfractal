import { faker } from '@faker-js/faker'
import { cast, isUndefined } from '@srtp/core'
import { filter, paged, pipe, sorted, toArray } from '@srtp/fn'
import invariant from 'tiny-invariant'

import { TaskSearch, type Task } from './specs'
import { usersList } from './usersDb'

const tasksTable = new Map<number, Task>()

type SeedTasksOptions = Readonly<{
  minTasksPerUser: number
  maxTasksPuerUser: number
  tasksCount: number
}>

let nextId: number
export function seedTasks(
  options: SeedTasksOptions = {
    minTasksPerUser: 1,
    maxTasksPuerUser: 5,
    tasksCount: 20,
  },
) {
  const users = usersList()

  for (let i = 0; i < options.tasksCount; i++) {
    const userId = faker.helpers.arrayElement(users).id

    tasksTable.set(i, {
      id: i,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
      userId,
    })
  }
  nextId = options.tasksCount
}

function applySearch(
  list: Iterable<Task>,
  { limit, page, completed, search }: TaskSearch,
) {
  const input = toArray(list)

  const result = pipe(
    input,
    sorted((a, b) => a.id - b.id),
    filter(t => isUndefined(completed) || t.completed === completed),
    filter(t => isUndefined(search) || t.title.includes(search)),
    toArray,
    paged(page, limit),
  )

  return result
}

export function tasksList(filters?: TaskSearch): Task[] {
  return applySearch(tasksTable.values(), cast(TaskSearch, filters ?? {}))
}

export function createTask(task: Omit<Task, 'id'>): Task {
  const id = nextId++
  const result = { id, ...task }
  tasksTable.set(id, result)

  return result
}

export function replaceTask(id: number, task: Task): Task | undefined {
  invariant(id === task.id, 'id in path and body must match')

  if (!tasksTable.has(id)) {
    return undefined
  }

  tasksTable.set(id, task)
  return task
}

export function updateTask(id: number, task: Partial<Task>): Task | undefined {
  const existing = tasksTable.get(id)
  if (!existing) {
    return undefined
  }

  const updated = { ...existing, ...task }
  tasksTable.set(id, updated)
  return updated
}

export function removeTask(id: number): Task | undefined {
  const task = tasksTable.get(id)
  if (!task) {
    return undefined
  }

  tasksTable.delete(id)

  return task
}
