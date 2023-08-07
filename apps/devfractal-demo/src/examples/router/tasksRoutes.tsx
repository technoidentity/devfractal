import { Pre } from '@srtp/react'
import { pages } from '@srtp/router'
import { number } from '@srtp/validator'
import { Filters } from '../specs'
import { path } from '@srtp/endpoint'

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
      <h1>Task View</h1> <Pre value={params} />{' '}
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
    path: path(['tasks']),
    request: Filters,
    element: <TasksList />,
  },

  taskView: {
    path: path(['tasks', { id: number() }]),
    element: <TaskView />,
  },

  taskEdit: {
    path: path(['tasks', { id: number() }, 'edit']),
    element: <TaskEdit />,
  },
  taskCreate: {
    path: path(['tasks', 'create']),
    element: <TaskCreate />,
  },
  usersList: {
    path: path(['users']),
    element: <UsersList />,
  },
  userView: {
    path: path(['users', { id: number() }]),
    element: <UserView />,
  },
  userEdit: {
    path: path(['users', { id: number() }, 'edit']),
    element: <UserEdit />,
  },
  userCreate: {
    path: path(['users', 'create']),
    element: <UserCreate />,
  },
  userTasksList: {
    path: path(['users', { id: number() }, 'tasks']),
    request: Filters,
    element: <UserTasksList />,
  },
})

export const tasksRoutes = tasksApp.routes
