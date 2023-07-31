import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { epMutation, epQuery } from '@srtp/query'
import { useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'
import { taskEndpoints, type Task } from '../tasksEndpoints'

type TaskItemProps = Readonly<{
  task: Task
  onToggle: (task: Task) => void
  onDelete: (taskId: number) => void
}>

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  return (
    <Flex placeItems="baseline" mb="2" alignItems="baseline" gap="4">
      <Checkbox isChecked={task.completed} onChange={() => onToggle(task)}>
        {task.title}
      </Checkbox>

      <Button size="xs" onClick={() => onDelete(task.id)}>
        <CloseIcon color="red.500" />
      </Button>
    </Flex>
  )
}

export type AddTaskProps = Readonly<{ onAdd: (title: string) => void }>

const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useInputState('')

  const submit = () => {
    if (title.trim() !== '') {
      onAdd(title)
      setTitle('')
    }
  }

  const keyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      submit()
    }
  }

  return (
    <Flex direction="row" m="2" alignItems="baseline" gap="2">
      <Input
        type="text"
        value={title}
        placeholder="Enter task title..."
        onKeyDown={keyDown}
        onChange={setTitle}
      />

      <Button onClick={submit}>Add</Button>
    </Flex>
  )
}

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
    <Container>
      <Heading
        as="h2"
        m="2"
        fontSize="2xl"
        fontWeight="semibold"
        textAlign="center"
      >
        Tasks
      </Heading>

      <AddTask onAdd={addTask.mutate} />

      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask.mutate}
            onDelete={deleteTask.mutate}
          />
        ))}
      </div>
    </Container>
  )
}
