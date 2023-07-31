import { serve } from '@hono/node-server'
import { todoApp } from './epTodoRoute'
import { initializeFakeTodoTable } from './todoDb'

initializeFakeTodoTable()

const port = process.env['PORT'] || 8080

serve({ fetch: todoApp.fetch, port: 8080 }, () => {
  console.log(`server started at port: ${port}`)
})
