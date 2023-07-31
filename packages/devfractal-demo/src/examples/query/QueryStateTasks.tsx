/* eslint-disable @typescript-eslint/no-misused-promises */
import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { queryState } from '@srtp/query'
import { useInputState } from '@srtp/react'
import { cast } from '@srtp/spec'
import { http } from '@srtp/web'
import type { KeyboardEvent } from 'react'
import { z } from 'zod'
import { Task } from '../specs'

const TaskList = z.array(Task)

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

const api = http

const [useTaskQuery, actions] = queryState(
  ['tasks'],
  { queryFn: () => api.get(`${baseUrl}/tasks`) },
  {
    toggleTask: (task: Task) => {
      return api.patch(`${baseUrl}/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      })
    },

    addTask: (title: string) => {
      return api.post(`${baseUrl}/tasks`, { title, completed: false })
    },

    deleteTask: (id: number) => {
      return api.delete(`${baseUrl}/tasks/${id}`)
    },
  },
)

export const QueryTaskApp = () => {
  const { data } = useTaskQuery({ params: {} })

  const [toggleTask] = actions.useToggleTask()
  const [addTask] = actions.useAddTask()
  const [deleteTask] = actions.useDeleteTask()

  const tasks = cast(TaskList, data)

  console.count()

  return (
    <Container>
      <Heading
        as="h2"
        m="2"
        fontSize="2xl"
        fontWeight="semibold"
        textAlign="center"
      >
        Tasks List
      </Heading>

      <AddTask onAdd={addTask} />

      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </Container>
  )
}
