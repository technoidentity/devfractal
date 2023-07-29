import { pages } from '@srtp/router'
import { jstr } from '@srtp/spec'
import { type RouteObject } from 'react-router-dom'
import { number, z } from 'zod'

const Filters = z.object({
  search: z.string().optional(),
  page: number().optional(),
  perPage: number().optional(),
})

const tasksApp = pages({
  tasksList: { path: ['tasks'], request: Filters },
  taskView: { path: ['tasks', { id: number() }] },
  taskEdit: { path: ['tasks', { id: number() }, 'edit'] },
  taskCreate: { path: ['tasks', 'create'] },
  usersList: { path: ['users'] },
  userView: { path: ['users', { id: number() }] },
  userEdit: { path: ['users', { id: number() }, 'edit'] },
  userCreate: { path: ['users', 'create'] },
  userTasksList: {
    path: ['users', { id: number() }, 'tasks'],
    request: Filters,
  },
})

export const Pre = ({ children }: { readonly children?: object }) => (
  <pre>{jstr(children) || 'empty value'}</pre>
)

const TasksList = () => {
  const [search] = tasksApp.tasksList.useSearch()

  return (
    <div>
      <h1>Tasks List</h1>
      <Pre>{{ search }} </Pre>
    </div>
  )
}

const TaskView = () => {
  const params = tasksApp.taskView.useParams()

  return (
    <div>
      <h1>Task View</h1>
      <Pre>{{ params }}</Pre>
    </div>
  )
}

const TaskEdit = () => {
  const params = tasksApp.taskEdit.useParams()

  return (
    <div>
      <h1>Task Edit </h1>
      <Pre>{{ params }}</Pre>
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
      <Pre>{{ params }}</Pre>
    </div>
  )
}

const UserEdit = () => {
  const params = tasksApp.userEdit.useParams()

  return (
    <div>
      <div>User Edit </div>
      <Pre>{{ params }}</Pre>
    </div>
  )
}

const UserCreate = () => <div>User Create </div>
const UserTasksList = () => {
  const [search] = tasksApp.userTasksList.useSearch()

  return (
    <div>
      <h1>User Tasks List </h1>
      <Pre>{{ search }} </Pre>
    </div>
  )
}

export const tasksRoutes: RouteObject[] = [
  { path: tasksApp.tasksList.path, element: <TasksList /> },
  { path: tasksApp.taskView.path, element: <TaskView /> },
  { path: tasksApp.taskEdit.path, element: <TaskEdit /> },
  { path: tasksApp.taskCreate.path, element: <TaskCreate /> },
  { path: tasksApp.usersList.path, element: <UsersList /> },
  { path: tasksApp.userView.path, element: <UserView /> },
  { path: tasksApp.userEdit.path, element: <UserEdit /> },
  { path: tasksApp.userCreate.path, element: <UserCreate /> },
  { path: tasksApp.userTasksList.path, element: <UserTasksList /> },
  { path: '*', element: <div>Invalid Path</div> },
]
