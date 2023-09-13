// import { UpdateExample } from '@/examples/state/UpdateExample'

import { createBrowserRouter, type RouteObject } from 'react-router-dom'

import { QueryTaskApp } from './examples/query/EpStateTasks'
import { tasksRoutes } from './examples/router/tasksRoutes'
import './global.css'

const indexRoute: RouteObject = { path: '/', element: <QueryTaskApp /> }

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([...tasksRoutes, indexRoute])
