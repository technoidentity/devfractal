import { del, get, post, put } from '@srtp/web'
import { z } from 'zod'

const todo = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
})

const todos = await get({ spec: z.array(todo) })('/api/todos?_limit=5')
console.table(todos)

await post({ spec: todo })('/api/todos', {
  title: 'foo',
  completed: false,
}).then(console.log)

await put({ spec: todo })(`/api/todos/${todos[1].id}`, {
  id: todos[1].id,
  title: 'foo bar',
  completed: true,
}).then(console.log)

await del({ spec: z.any() })(`/api/todos/${todos[0].id}`).then(console.log)
