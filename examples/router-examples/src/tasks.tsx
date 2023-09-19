import { jstr, number, path } from '@srtp/core'
import { Search } from '@srtp/fake-tasks'
import { chain, filter } from '@srtp/fn'
import { ReactProvider } from '@srtp/react'
import { pages } from '@srtp/router'
import { Code, Container, Input, ThemeProvider, Ul } from '@srtp/ui'
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import invariant from 'tiny-invariant'

const tasks = [
  { id: 1, title: 'Task 1' },
  { id: 2, title: 'Task 2' },
  { id: 3, title: 'Task 3' },
  { id: 4, title: 'Task 4' },
  { id: 5, title: 'Task 5' },
]

const TasksList = () => {
  const [search] = tasksApp.tasksList.useSearch()

  return (
    <div>
      <h1>Tasks List</h1>
      <p className="py-4">
        Search: <Code>{jstr(search)}</Code>
      </p>
      <Input name="search" type="text" />
      <Ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
          </li>
        ))}
      </Ul>
    </div>
  )
}

const TaskView = () => {
  const { id } = tasksApp.taskView.useParams()

  const task = chain(
    tasks,
    filter(t => t.id === id),
  ).at(0)

  invariant(task, 'Task not found')

  return (
    <div>
      <h1>Task View</h1>
      Task ID: <Code>{task.id}</Code>
      <p>{task.title}</p>
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
})

const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

const Home = () => {
  return (
    <Link
      to="/tasks"
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      Tasks
    </Link>
  )
}

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        index: true,
        element: <Home />,
      },
      ...tasksApp.routes,
    ],
  },
])

const ErrorFallback = () => <h1>Error</h1>

export const TasksApp = () => (
  <ReactProvider
    ErrorFallback={ErrorFallback}
    suspenseFallback={<h1>Loading...</h1>}
  >
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </ReactProvider>
)
