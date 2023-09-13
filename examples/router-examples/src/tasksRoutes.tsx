import { jstr, number, path } from '@srtp/core'
import { Search } from '@srtp/fake-tasks'
import { pages } from '@srtp/router'
import { Code } from '@srtp/ui'

const TasksList = () => {
  const [search] = tasksApp.tasksList.useSearch()

  return (
    <div>
      <h1>Tasks List</h1>
      <Code>{jstr(search)}</Code>
    </div>
  )
}

const TaskView = () => {
  const params = tasksApp.taskView.useParams()

  return (
    <div>
      <h1>Task View</h1> <Code>{jstr(params)}</Code>
    </div>
  )
}

const TaskEdit = () => {
  const params = tasksApp.taskEdit.useParams()

  return (
    <div>
      <h1>Task Edit </h1>
      <Code>{jstr(params)}</Code>
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
      <Code>{jstr(params)}</Code>
    </div>
  )
}

const UserEdit = () => {
  const params = tasksApp.userEdit.useParams()

  return (
    <div>
      <div>User Edit </div>
      <Code>{jstr(params)}</Code>
    </div>
  )
}

const UserCreate = () => <div>User Create </div>
const UserTasksList = () => {
  const [search] = tasksApp.userTasksList.useSearch()

  return (
    <div>
      <h1>User Tasks List </h1>
      <Code>{jstr(search)}</Code>
    </div>
  )
}

const tasksApp = pages({
  tasksList: {
    path: path(['tasks']),
    request: Search,
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
    request: Search,
    element: <UserTasksList />,
  },
})

export const tasksRoutes = tasksApp.routes
