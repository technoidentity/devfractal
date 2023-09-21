import type { Task } from '@srtp/fake-tasks'
import { taskEndpoints } from '@srtp/fake-tasks'
import { epQueryState } from '@srtp/query'
import { TasksList } from '@srtp/ui-tasks'

const baseUrl = '/api'

const api = epQueryState(taskEndpoints, baseUrl, {
  addTask(title: string) {
    return { request: { title, completed: false } }
  },

  removeTask(id: number) {
    return { params: { id } }
  },

  updateTask(task: Task) {
    return {
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
    }
  },
})

export const QueryTaskApp = () => {
  const [taskList, invalidateKey] = api.useGetTasks({
    request: { limit: 100, page: 2 },
  })

  const toggleTask = api.useUpdateTask({ invalidateKey })
  const addTask = api.useAddTask({ invalidateKey })
  const removeTask = api.useRemoveTask({ invalidateKey })

  // eslint-disable-next-line no-console
  console.count()

  return (
    <TasksList
      taskList={taskList}
      onToggle={toggleTask.mutate}
      onAdd={addTask.mutate}
      onRemove={removeTask.mutate}
    />
  )
}
