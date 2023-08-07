import { serve } from '@hono/node-server'
import { tasksApp } from './TasksServer'
import { initializeFakeTasksTable } from './tasksDb'

initializeFakeTasksTable()

const port = process.env['PORT'] || 8080

serve({ fetch: tasksApp.fetch, port: 8080 }, () => {
  console.log(`server started at port: ${port}`)
})
