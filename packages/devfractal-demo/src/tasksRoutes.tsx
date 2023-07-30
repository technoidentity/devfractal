import { Pre } from '@srtp/react'
import { pages } from '@srtp/router'
import { number, string } from '@srtp/validator'
import { type RouteObject } from 'react-router-dom'
import { z } from 'zod'

const Filters = z.object({
  search: string().optional(),
  page: number().optional(),
  perPage: number().optional(),
})

const TasksList = () => {
  const [search] = tasksApp.tasksList.useSearch()

  return (
    <div>
      <h1>Tasks List</h1>
      <Pre value={search} />
    </div>
  )
}

const TaskView = () => {
  const params = tasksApp.taskView.useParams()

  return (
    <div>
      <h1>Task View</h1>
      <Pre value={params} />
    </div>
  )
}

const TaskEdit = () => {
  const params = tasksApp.taskEdit.useParams()

  return (
    <div>
      <h1>Task Edit </h1>
      <Pre value={params} />
    </div>
  )
}
const TaskCreate = () => <div>Task Create </div>

const UsersList = () => <div>Users List</div>

const UserView = () => {
  const params = tasksApp.userView.useParams()

  return (
    <div>
      <h1>User View </h1>
      <Pre value={params} />
    </div>
  )
}

const UserEdit = () => {
  const params = tasksApp.userEdit.useParams()

  return (
    <div>
      <div>User Edit </div>
      <Pre value={params} />
    </div>
  )
}

const UserCreate = () => <div>User Create </div>
const UserTasksList = () => {
  const [search] = tasksApp.userTasksList.useSearch()

  return (
    <div>
      <h1>User Tasks List </h1>
      <Pre value={search} />
    </div>
  )
}

const tasksApp = pages({
  tasksList: {
    path: ['tasks'],
    request: Filters,
    element: <TasksList />,
  },

  taskView: {
    path: ['tasks', { id: number() }],
    element: <TaskView />,
  },

  taskEdit: {
    path: ['tasks', { id: number() }, 'edit'],
    element: <TaskEdit />,
  },
  taskCreate: {
    path: ['tasks', 'create'],
    element: <TaskCreate />,
  },
  usersList: {
    path: ['users'],
    element: <UsersList />,
  },
  userView: {
    path: ['users', { id: number() }],
    element: <UserView />,
  },
  userEdit: {
    path: ['users', { id: number() }, 'edit'],
    element: <UserEdit />,
  },
  userCreate: {
    path: ['users', 'create'],
    element: <UserCreate />,
  },
  userTasksList: {
    path: ['users', { id: number() }, 'tasks'],
    request: Filters,
    element: <UserTasksList />,
  },
})

export const tasksRoutes: RouteObject[] = tasksApp.routes
