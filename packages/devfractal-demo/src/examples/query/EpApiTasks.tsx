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
import type { Task } from '../tasksEndpoints'
import { taskEndpoints } from '../tasksEndpoints'

type TaskItemProps = Readonly<{
  task: Task
  onToggle: (task: Task) => void
  onRemove: (taskId: number) => void
}>

const TaskItem = ({ task, onToggle, onRemove }: TaskItemProps) => {
  return (
    <Flex placeItems="baseline" mb="2" alignItems="baseline" gap="4">
      <Checkbox isChecked={task.completed} onChange={() => onToggle(task)}>
        {task.title}
      </Checkbox>

      <Button size="xs" onClick={() => onRemove(task.id)}>
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

const tasks = createEpApi(taskEndpoints, '/api')

export const QueryTaskApp = () => {
  const [taskList] = tasks.useGetTasks({
    request: { limit: 10, page: 1 },
  })

  const toggleTask = tasks.useUpdateTask({})
  const addTask = tasks.useAddTask({})
  const removeTask = tasks.useRemoveTask({})

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

      <AddTask onAdd={onAdd} />

      <div>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </div>
    </Container>
  )
}
