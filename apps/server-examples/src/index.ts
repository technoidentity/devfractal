import { faker } from '@faker-js/faker'
import { serve } from '@hono/node-server'
import { filter, iterSlice, pipe, sorted, toArray } from '@srtp/fn'
import { cast } from '@srtp/spec'
import { boolean, number, string } from '@srtp/validator'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

const Todo = z.object({
  id: number(),
  title: string(),
  completed: boolean(),
})
type Todo = z.infer<typeof Todo>

const Filters = z.object({
  page: number().default(1),
  limit: number().default(10),
  search: string().optional(),
  completed: boolean().optional(),
})

type Filters = z.infer<typeof Filters>

const todoTable = new Map<number, Todo>()

let nextId: number
function initializeFakeTodoTable(N = 100) {
  for (let i = 0; i < N; i++) {
    todoTable.set(i, {
      id: i,
      title: faker.lorem.sentence(),
      completed: faker.datatype.boolean(),
    })
  }
  nextId = N
}

function paginate<T>(page: number, limit: number) {
  return (list: Iterable<T>) => {
    const start = (page - 1) * limit
    const end = page * limit
    return pipe(list, iterSlice(start, end))
  }
}

app.get('/todos', c => {
  const { limit, page, completed, search } = cast(Filters, c.req.query())

  const todoList = pipe(
    todoTable.values(),
    sorted((a, b) => a.id - b.id),
    filter(t => completed === undefined || t.completed === completed),
    filter(t => search === undefined || t.title.includes(search)),
    paginate(page, limit),
    toArray,
  )

  return c.json({ data: todoList })
})

app.post('/todos', async c => {
  const body = cast(Todo.omit({ id: true }), await c.req.json())

  const todo = { id: nextId++, ...body }

  todoTable.set(todo.id, todo)

  return c.json({ data: todo })
})

app.put('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))
  const body = await c.req.json()

  const todo = cast(Todo, body)

  todoTable.set(id, todo)

  return c.json({ data: todo })
})

app.delete('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))

  const todo = todoTable.get(id)
  if (!todo) {
    return c.status(404)
  }

  todoTable.delete(id)

  return c.json({ data: todo })
})

app.patch('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))
  const todo = todoTable.get(id)

  if (!todo) {
    return c.status(404)
  }

  const patch = await c.req.json()

  const updated = Todo.parse({ ...todo, ...patch })

  todoTable.set(id, updated)

  return c.json({ data: updated })
})

initializeFakeTodoTable()

serve({
  fetch: app.fetch,
  port: 8080,
})
