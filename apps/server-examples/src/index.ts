import { serve } from '@hono/node-server'
import {} from '@srtp/endpoint'
import { cast } from '@srtp/spec'
import { Hono } from 'hono'
import { badRequest, notFound } from './errors'
import {
  Filters,
  Todo,
  createTodo,
  deleteTodo,
  initializeFakeTodoTable,
  replaceTodo,
  todoList,
  updateTodo,
} from './todoDb'

initializeFakeTodoTable()

const app = new Hono()

app.get('/todos', c => {
  const filters = cast(Filters, c.req.query())

  return c.json({ data: todoList(filters) })
})

app.post('/todos', async c => {
  const body = cast(Todo.omit({ id: true }), await c.req.json())

  return c.json({ data: createTodo(body) })
})

app.put('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))
  const todo = cast(Todo, await c.req.json())

  if (id !== todo.id) {
    throw badRequest(`id in path(${id}) and body(${todo.id}) must match`)
  }

  return c.json({ data: replaceTodo(id, todo) })
})

app.delete('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))

  const todo = deleteTodo(id)

  if (!todo) {
    throw notFound()
  }

  return c.json({ data: todo })
})

app.patch('/todos/:id', async c => {
  const id = cast(Todo.shape.id, c.req.param('id'))
  const update = cast(Todo.omit({ id: true }).partial(), await c.req.json())

  const todo = updateTodo(id, update)

  if (!todo) {
    throw notFound()
  }

  return c.json({ data: todo })
})

serve({ fetch: app.fetch, port: 8080 })
