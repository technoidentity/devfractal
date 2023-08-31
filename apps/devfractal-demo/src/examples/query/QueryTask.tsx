import { epActionMutation, epQuery } from 'devfractal'

import type { Task } from '../../../../../packages/fakeTasks/src/specs'
import { taskEndpoints } from '../tasksEndpoints'

import { TasksList } from './TaskViews'

const baseUrl = '/api'

const useTaskQuery = epQuery(taskEndpoints.getTasks, baseUrl)
const useToggleTask = epActionMutation(taskEndpoints.updateTask, baseUrl)
const useAddTask = epActionMutation(taskEndpoints.addTask, baseUrl)
const useDeleteTask = epActionMutation(taskEndpoints.removeTask, baseUrl)

export const QueryTaskApp = () => {
  const [tasks, , invalidateKey] = useTaskQuery({
    request: { limit: 10, page: 1 },
  })

  const toggleTask = useToggleTask({
    action: (task: Task) => ({
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
      invalidateKey,
    }),
  })

  const addTask = useAddTask({
    action: (title: string) => ({
      request: { title, completed: false },
      invalidateKey,
    }),
  })

  const deleteTask = useDeleteTask({
    action: (id: number) => ({
      params: { id },
      request: undefined,
      invalidateKey,
    }),
  })

  return (
    <TasksList
      taskList={tasks}
      onToggle={toggleTask.mutate}
      onAdd={addTask.mutate}
      onRemove={deleteTask.mutate}
    />
  )
}
