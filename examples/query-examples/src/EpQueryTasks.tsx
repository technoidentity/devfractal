import type { Task } from '@srtp/fake-tasks'
import { taskEndpoints } from '@srtp/fake-tasks'
import { createEpApi } from '@srtp/query'

import { TasksList } from './TaskViews'

const baseUrl = '/api'

const api = createEpApi(taskEndpoints, baseUrl)

export const QueryTaskApp = () => {
  const [taskList, invalidateKey] = api.useGetTasks({
    request: { limit: 100, page: 2 },
  })

  const toggleTask = api.useUpdateTask({})
  const addTask = api.useAddTask({})
  const removeTask = api.useRemoveTask({})

  const onToggle = (task: Task) =>
    toggleTask.mutate({
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
      invalidateKey,
    })

  const onAdd = (title: string) =>
    addTask.mutate({ request: { title, completed: false }, invalidateKey })

  const onRemove = (id: number) =>
    removeTask.mutate({ params: { id }, invalidateKey })

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
