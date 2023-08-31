import {
  Button,
  Checkbox,
  Container,
  Flex,
  H2,
  HStack,
  Input,
  Text,
  useInputState,
} from 'devfractal'
import { Trash2 } from 'lucide-react'

import type { Task } from '../../../../../packages/fakeTasks/src/specs'

export type TaskItemProps = Readonly<{
  task: Task
  onToggle: (task: Task) => void
  onRemove: (taskId: number) => void
}>

export const TaskItem = ({ task, onToggle, onRemove }: TaskItemProps) => {
  return (
    <HStack className="items-center space-x-3 space-y-0 rounded-md p-4 shadow">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task)}
      />
      <Text className="space-y-1 leading-none">{task.title}</Text>
      <Button size="sm" onClick={() => onRemove(task.id)}>
        <Trash2 />
      </Button>
    </HStack>
  )
}

export type AddTaskProps = Readonly<{ onAdd: (title: string) => void }>

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [title, setTitle] = useInputState('')

  const submit = () => {
    if (title.trim() !== '') {
      onAdd(title)
      setTitle('')
    }
  }

  const keyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      submit()
    }
  }

  return (
    <Flex className="align-baseline m-2 gap-2">
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

export type TasksListProps = Readonly<{
  taskList: readonly Task[]
  onToggle: (task: Task) => void
  onRemove: (taskId: number) => void
  onAdd: (title: string) => void
}>

export const TasksList = ({
  taskList,
  onToggle,
  onRemove,
  onAdd,
}: TasksListProps) => {
  return (
    <Container>
      <H2 className="m-2 text-2xl font-semibold text-center">Tasks List</H2>

      <AddTask onAdd={onAdd} />

      <>
        {taskList.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </>
    </Container>
  )
}
