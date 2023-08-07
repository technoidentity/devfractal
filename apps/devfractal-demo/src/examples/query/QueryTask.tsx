import { epMutation, epQuery } from '@srtp/query'
import type { Task } from '../specs'
import { taskEndpoints } from '../tasksEndpoints'
import { TasksList } from './TaskViews'

const baseUrl = '/api'

const useTaskQuery = epQuery(taskEndpoints.getTasks, baseUrl)
const useToggleTask = epMutation(taskEndpoints.updateTask, baseUrl)
const useAddTask = epMutation(taskEndpoints.addTask, baseUrl)
const useDeleteTask = epMutation(taskEndpoints.removeTask, baseUrl)

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
