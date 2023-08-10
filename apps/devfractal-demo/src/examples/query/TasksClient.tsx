import { createEpApi } from 'devfractal'
import type { Task } from '../specs'
import { taskEndpoints } from '../tasksEndpoints'
import { TasksList } from './TaskViews'

const tasks = createEpApi(taskEndpoints, '/api')

export const QueryTaskApp = () => {
  const [taskList, invalidateKey] = tasks.useGetTasks({
    request: { limit: 10, page: 1 },
  })

  const toggleTask = tasks.useUpdateTask({ invalidateKey })
  const addTask = tasks.useAddTask({ invalidateKey })
  const removeTask = tasks.useRemoveTask({ invalidateKey })

  function onToggle(task: Task) {
    toggleTask.mutate({
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
    })
  }

  function onRemove(id: number) {
    removeTask.mutate({ params: { id }, request: undefined })
  }

  function onAdd(title: string) {
    addTask.mutate({ request: { title, completed: false } })
  }

  return (
    <TasksList
      taskList={taskList}
      onToggle={onToggle}
      onRemove={onRemove}
      onAdd={onAdd}
    />
  )
}
