// import {} from '@srtp/endpoint'

// import { Hono } from 'hono'
// import { throwBadRequest, throwCast, throwNotFound } from '@srtp/server'
// import {
//   Filters,
//   Todo,
//   createTodo,
//   deleteTodo,
//   initializeFakeTodoTable,
//   replaceTodo,
//   todoList,
//   updateTodo,
// } from './todoDb'

// initializeFakeTodoTable()

// const app = new Hono()

// app.get('/todos', c => {
//   const filters = throwCast(Filters, c.req.query())

//   return c.json({ data: todoList(filters) })
// })

// app.post('/todos', async c => {
//   const body = throwCast(Todo.omit({ id: true }), await c.req.json())

//   return c.json({ data: createTodo(body) })
// })

// app.put('/todos/:id', async c => {
//   const id = throwCast(Todo.shape.id, c.req.param('id'))
//   const todo = throwCast(Todo, await c.req.json())

//   if (id !== todo.id) {
//     throwBadRequest(`id in path(${id}) and body(${todo.id}) must match`)
//   }

//   return c.json({ data: replaceTodo(id, todo) })
// })

// app.delete('/todos/:id', async c => {
//   const id = throwCast(Todo.shape.id, c.req.param('id'))

//   const todo = deleteTodo(id)

//   if (!todo) {
//     throwNotFound()
//   }

//   return c.json({ data: todo })
// })

// app.patch('/todos/:id', async c => {
//   const id = throwCast(Todo.shape.id, c.req.param('id'))
//   const update = throwCast(
//     Todo.omit({ id: true }).partial(),
//     await c.req.json(),
//   )

//   const todo = updateTodo(id, update)

//   if (!todo) {
//     throw throwNotFound()
//   }

//   return c.json({ data: todo })
// })

export const dummy = 1
