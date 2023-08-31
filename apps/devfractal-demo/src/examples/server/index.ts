import { serve } from '@hono/node-server'
import { seedTasks } from '@srtp/fake-tasks'

import { tasksApp } from './TasksServer'

seedTasks()

const port = process.env.PORT ?? 8080

serve({ fetch: tasksApp.fetch, port: 8080 }, () => {
  console.log(`server started at port: ${port}`)
})
