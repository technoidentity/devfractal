import type { Task } from '@srtp/fake-tasks'
import { epQueryState } from 'devfractal'

import { taskEndpoints } from '../tasksEndpoints'
import { TasksList } from './TaskViews'

const baseUrl = '/api'

const api = epQueryState(taskEndpoints, baseUrl, {
  addTask: (title: string, ctx) => ({
    request: { title, completed: false },
    invalidateKey: ctx.getTasks(),
  }),

  removeTask: (id: number, ctx) => ({
    params: { id },
    invalidateKey: ctx.getTasks(),
  }),

  updateTask: (task: Task, ctx) => ({
    params: { id: task.id },
    request: { ...task, completed: !task.completed },
    invalidateKey: ctx.getTasks(),
  }),
})

export const QueryTaskApp = () => {
  const [taskList] = api.useGetTasks({
    request: { limit: 100, page: 2 },
  })

  const toggleTask = api.useUpdateTask({})
  const addTask = api.useAddTask({})
  const removeTask = api.useRemoveTask({})

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
