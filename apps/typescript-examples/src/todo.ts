import { faker } from '@faker-js/faker'
import {
  filter,
  flatten,
  groupBy,
  map,
  omit,
  orderBy,
  pipe,
  range,
  skip,
  toArray,
} from '@srtp/fn'
import produce from 'immer'

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

function getUsers(n: number) {
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

function createTasks(userId: number, maxTasksPerUser: number) {
  const taskCount = faker.datatype.number({ min: 2, max: maxTasksPerUser })

  return pipe(
    range(taskCount),
    map(_ => createTask(userId)),
    toArray,
  )
}

export function getTasks(users: Iterable<User>, maxTasksPerUser: number) {
  return pipe(
    users,
    map(u => createTasks(u.id, maxTasksPerUser)),
    flatten,
    toArray,
  )
}

const users = getUsers(5)
let tasks = getTasks(users, 10)

type CompletedTodoListResult = Iterable<{
  username: string
  todoList: Array<{ title: string; deadline: Date }>
}>

export function entries<K extends string | number, V>(
  o: Record<K, V>,
): Array<[K, V]> {
  return Object.entries(o) as Array<[K, V]>
}

export function getCompletedTodoListFor(
  ...userIds: number[]
): CompletedTodoListResult {
  const userMap = users
    .filter(u => userIds.includes(u.id))
    .reduce<Record<number, string>>(
      (acc, u) => ({ ...acc, [u.id]: u.name }),
      {},
    )

  return pipe(
    tasks,
    filter(t => userIds.includes(t.userId) && t.completed),
    groupBy(t => t.userId),
    entries,
    map(([userId, todoList]) => ({
      username: userMap[userId],
      todoList: todoList.map(omit(['userId'])),
    })),
  )
}

// console.log([...getCompletedTodoListFor(1000, 1001, 1002)])

export function setCompletedAboveDeadline(userId: number): void {
  tasks = produce(tasks, draft => {
    draft
      .filter(t => t.userId === userId && t.deadline < new Date())
      .forEach(t => (t.completed = true))
  })
}

// console.log(setCompletedAboveDeadline(1000))
// console.log(
//   tasks
//     .filter(t => t.userId === 1000 && t.deadline < new Date())
//     .map(t => t.completed),
// )

type MostIncompleteUsersResult = IterableIterator<
  Readonly<{ username: string; count: number }>
>

export function getMostIncompleteUsers(n: number): MostIncompleteUsersResult {
  // @TODO: make this reactive
  const userMap = users.reduce<Record<number, string>>(
    (acc, u) => ({ ...acc, [u.id]: u.name }),
    {},
  )
  return pipe(
    tasks,
    filter(t => !t.completed),
    groupBy(t => t.userId),
    entries,
    map(([userId, todoList]) => ({
      username: userMap[userId],
      count: todoList.length,
    })),
    orderBy('count'),
    skip(users.length - n),
  )
}

// console.log([...getMostIncompleteUsers(2)])
