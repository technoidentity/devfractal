/* eslint-disable @typescript-eslint/no-misused-promises */
import { cast, http, queryState } from 'devfractal'
import { z } from 'zod'

import { Task } from '../../../../../packages/fakeTasks/src/specs'

import { TasksList } from './TaskViews'

const TaskListSpec = z.array(Task)

const baseUrl = '/api'

const api = http

const [useTaskQuery, actions] = queryState(
  ['tasks'],
  { queryFn: () => api.get$(`${baseUrl}/tasks`) },
  {
    toggleTask: (task: Task) => {
      return api.patch$(`${baseUrl}/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      })
    },

    addTask: (title: string) => {
      return api.post$(`${baseUrl}/tasks`, { title, completed: false })
    },

    deleteTask: (id: number) => {
      return api.del$(`${baseUrl}/tasks/${id}`)
    },
  },
)

export const QueryTaskApp = () => {
  const { data } = useTaskQuery({ params: {} })

  const [toggleTask] = actions.useToggleTask()
  const [addTask] = actions.useAddTask()
  const [deleteTask] = actions.useDeleteTask()

  const tasks = cast(TaskListSpec, data)

  console.count()

  return (
    <TasksList
      taskList={tasks}
      onToggle={toggleTask}
      onAdd={addTask}
      onRemove={deleteTask}
    />
  )
}
