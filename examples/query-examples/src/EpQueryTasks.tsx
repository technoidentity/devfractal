import type { Task } from '@srtp/fake-tasks'
import { taskEndpoints } from '@srtp/fake-tasks'
import { createEpApi } from '@srtp/query'
import { TasksList } from '@srtp/ui-tasks'

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

  const onRemove = (id: number) => removeTask.mutate({ params: { id } })

  // eslint-disable-next-line no-console
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
