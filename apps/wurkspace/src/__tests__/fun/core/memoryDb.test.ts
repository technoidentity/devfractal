import type { DB} from '@core/memoryDb';
import { db as tasksDb } from '@core/memoryDb'
import { z } from 'zod'

const Task = z.object({
  id: z.number(),
  title: z.string(),
  done: z.boolean(),
})

type Task = Readonly<z.infer<typeof Task>>
type Tasks = readonly Task[]

let db: DB<number, Task> | undefined

beforeEach(() => {
  let id = todos.length

  const nextID = () => {
    const newID = id
    id += 1

    return newID
  }

  db = tasksDb(todos, nextID)
})

const todos: Tasks = [
  { id: 1, title: 'learn next.js', done: true },
  { id: 2, title: 'implement dashboard', done: false },
  { id: 3, title: 'redesign calendar component ', done: true },
  { id: 4, title: 'write integration tests', done: true },
]

it('getTodos', () => {
  const all = db?.getAll()
  expect(db?.getAll()).toEqual(all)
})

it('postTodos', () => {
  const newTodo = { title: 'take tea breaks!', done: false }
  const todo = db?.add(newTodo)
  expect(todo?.id).toBeDefined()
  expect(db?.count()).toBe(5)
})

it('getOne', () => {
  expect(db?.getOne(3)).toEqual(todos[2])
  expect(db?.getOne(5)).toBeUndefined()
  expect(db?.getOne(1)?.title).toBe('learn next.js')
})

it('getMany', () => {
  expect(
    db?.getMany({
      orderBy: 'title',
      order: 'desc',
      offset: 1,
      limit: 2,
      pick: ['id', 'title'],
    }),
  ).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": 3,
        "title": "redesign calendar component ",
      },
      Object {
        "id": 2,
        "title": "implement dashboard",
      },
    ]
  `)
})

it('update', () => {
  expect(
    db?.update(3, { title: 'read Javascript The Definitive Guide' }),
  ).toEqual({
    id: 3,
    title: 'read Javascript The Definitive Guide',
    done: true,
  })
  expect(db?.count()).toBe(4)
})

it('replace', () => {
  expect(
    db?.replace(1, {
      id: 1,
      title: 'learn asynchronous programming',
      done: true,
    }),
  ).toEqual({ id: 1, title: 'learn asynchronous programming', done: true })
  expect(db?.count()).toBe(4)
})

it('remove', () => {
  expect(db?.remove(2)).toEqual({
    id: 2,
    title: 'implement dashboard',
    done: false,
  })
  expect(db?.getOne(2)).toBeUndefined()
})
