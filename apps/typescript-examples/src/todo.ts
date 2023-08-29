import { faker } from '@faker-js/faker'
import { computed, signal } from '@preact/signals-core'
import { ensure, toInt } from '@srtp/core'
import {
  entries,
  filter,
  flatten,
  groupBy,
  map,
  mget,
  omit,
  orderBy,
  pipe,
  range,
  take,
  toArray,
} from '@srtp/fn'
import { produce } from 'immer'
import { z } from 'zod'

type User = Readonly<{
  id: number
  name: string
  email: string
}>

type Task = Readonly<{
  deadline: Date
  id: number
  title: string
  completed: boolean
  userId: number
}>

let nextUserID = 1000
function createUser(): User {
  return {
    id: nextUserID++,
    name: faker.name.fullName(),
    email: faker.internet.email(),
  }
}

function createUsers(n: number) {
  return pipe(range(n), map(createUser), toArray)
}

let nextTaskID = 1000
function createTask(userId: number): Task {
  return {
    deadline: faker.date.between(new Date(2021, 12, 31), new Date()),
    id: nextTaskID++,
    title: faker.lorem.sentence(),
    completed: faker.datatype.boolean(),
    userId,
  }
}

function createTasksFor(userId: number, maxTasksPerUser: number) {
  const taskCount = faker.datatype.number({ min: 2, max: maxTasksPerUser })

  return pipe(
    range(taskCount),
    map(_ => createTask(userId)),
    toArray,
  )
}

export function createTasks(users: Iterable<User>, maxTasksPerUser: number) {
  return pipe(
    users,
    map(u => createTasksFor(u.id, maxTasksPerUser)),
    flatten,
    toArray,
  )
}

const users = signal(createUsers(5))
const tasks = signal(createTasks(users.value, 10))

const usernames = computed(() => new Map(users.value.map(u => [u.id, u])))

function username(userId: number) {
  return mget(usernames.value, toInt(userId)).name
}

type CompletedTodoListResult = Iterable<{
  username: string
  todoList: Array<{ title: string; deadline: Date }>
}>

export function getCompletedTodoListFor(
  ...userIds: number[]
): CompletedTodoListResult {
  return pipe(
    tasks.value,
    filter(t => userIds.includes(t.userId) && t.completed),
    groupBy(t => t.userId),
    entries,
    map(([userId, todoList]) => ({
      username: username(userId),
      todoList: todoList.map(omit(['userId'])),
    })),
  )
}

export function setCompletedAboveDeadline(userId: number): void {
  tasks.value = produce(tasks.value, draft => {
    draft
      .filter(t => t.userId === userId && t.deadline < new Date())
      .forEach(t => {
        t.completed = true
      })
  })
}

type MostIncompleteUsersResult = IterableIterator<
  Readonly<{ username: string; count: number }>
>

export function getMostIncompleteUsers(n: number): MostIncompleteUsersResult {
  ensure(z.number().int().nonnegative(), n)

  return pipe(
    tasks.value,
    filter(t => !t.completed),
    groupBy(t => t.userId),
    entries,
    map(([userId, todoList]) => ({
      username: username(userId),
      count: todoList.length,
    })),
    orderBy({ count: 'desc' }),
    take(n),
  )
}

// effect(() => {
//   console.log([...getCompletedTodoListFor(1000, 1001, 1002)])

//   console.log(
//     tasks.value
//       .filter(t => t.userId === 1000 && t.deadline < new Date())
//       .map(t => t.completed),
//   )

//   console.log([...getMostIncompleteUsers(2)])
// })

// effect(() => {
//   console.log(setCompletedAboveDeadline(1000))
// })
