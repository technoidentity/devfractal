import { serve } from '@hono/node-server'

import { initializeFakeTasksTable } from './tasksDb'
import { tasksApp } from './TasksServer'

initializeFakeTasksTable()

const port = process.env.PORT ?? 8080

serve({ fetch: tasksApp.fetch, port: 8080 }, () => {
  console.log(`server started at port: ${port}`)
})
