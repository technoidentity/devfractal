import { serve } from '@hono/node-server'
import { todoApp } from './epTodoRoute'
import { initializeFakeTodoTable } from './todoDb'

initializeFakeTodoTable()

serve({ fetch: todoApp.fetch, port: 8080 })
