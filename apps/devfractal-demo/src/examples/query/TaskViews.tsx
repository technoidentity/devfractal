import { Container, Flex } from '@/cui'
import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Input } from '@/ui/input'
import { H2 } from '@/ui/typography'
import { useInputState } from '@srtp/react'
import { DeleteIcon } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import type { Task } from '../specs'

export type TaskItemProps = Readonly<{
  task: Task
  onToggle: (task: Task) => void
  onRemove: (taskId: number) => void
}>

export const TaskItem = ({ task, onToggle, onRemove }: TaskItemProps) => {
  return (
    <Flex align="baseline" className="my-2 gap-4">
      <Checkbox checked={task.completed} onChange={() => onToggle(task)}>
        {task.title}
      </Checkbox>

      <Button size="sm" onClick={() => onRemove(task.id)}>
        <DeleteIcon color="red.500" />
      </Button>
    </Flex>
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

  const keyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === 'Enter') {
      submit()
    }
  }

  return (
    <Flex direction="row" align="baseline" className="m-2 gap-2">
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
