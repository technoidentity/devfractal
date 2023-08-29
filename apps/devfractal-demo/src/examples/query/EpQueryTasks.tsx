import { createEpApi } from 'devfractal'

import type { Task } from '../specs'
import { taskEndpoints } from '../tasksEndpoints'

import { TasksList } from './TaskViews'

const baseUrl = '/api'

const api = createEpApi(taskEndpoints, baseUrl)

export const QueryTaskApp = () => {
  const [taskList, invalidateKey] = api.useGetTasks({
    request: { limit: 100, page: 2 },
  })

  const toggleTask = api.useUpdateTask({ invalidateKey })
  const addTask = api.useAddTask({ invalidateKey })
  const removeTask = api.useRemoveTask({ invalidateKey })

  const onToggle = (task: Task) =>
    toggleTask.mutate({
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
    })

  const onAdd = (title: string) =>
    addTask.mutate({ request: { title, completed: false } })

  const onRemove = (id: number) =>
    removeTask.mutate({ params: { id }, request: undefined })

  console.count()

  return (
    <TasksList
      taskList={taskList}
      onToggle={onToggle}
      onAdd={onAdd}
      onRemove={onRemove}
    />
  )
}
