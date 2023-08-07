import { CloseIcon } from '@chakra-ui/icons'
import {
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
} from '@chakra-ui/react'
import { createEpApi } from '@srtp/query'
import { useInputState } from '@srtp/react'
import type { KeyboardEvent } from 'react'
import { taskEndpoints } from '../tasksEndpoints'
import type { Task } from '../specs'

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

const api = createEpApi(taskEndpoints, baseUrl)

export const QueryTaskApp = () => {
  const [taskList, invalidateKey] = api.useGetTasks({
    request: { limit: 10, page: 2 },
  })

  const toggleTask = api.useUpdateTask({ invalidateKey })
  const addTask = api.useAddTask({ invalidateKey })
  const deleteTask = api.useRemoveTask({ invalidateKey })

  const onToggle = (task: Task) =>
    toggleTask.mutate({
      params: { id: task.id },
      request: { ...task, completed: !task.completed },
    })

  const onAdd = (title: string) =>
    addTask.mutate({ request: { title, completed: false } })

  const onDelete = (id: number) =>
    deleteTask.mutate({ params: { id }, request: undefined })

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
        Task List
      </Heading>

      <AddTask onAdd={onAdd} />

      <div>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </Container>
  )
}
