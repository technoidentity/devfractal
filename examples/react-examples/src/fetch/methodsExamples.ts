/* eslint-disable no-console */
import { http } from '@srtp/web'
import { z } from 'zod'

const todo = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

const api = http

const [todos] = await api.get(z.array(todo), '/api/todos?_limit=5')
console.table(todos)

await api
  .post(todo, 'api/todos', {
    title: 'foo',
    completed: false,
  })
  .then(console.log)

await api
  .put(todo, `/api/todos/${todos[1].id}`, {
    id: todos[1].id,
    title: 'foo bar',
    completed: true,
  })
  .then(console.log)

await api.del(z.any(), `/api/todos/${todos[0].id}`).then(console.log)
