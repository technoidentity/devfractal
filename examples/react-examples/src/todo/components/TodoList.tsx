import { Checkbox, List, ListItem, Text } from '@chakra-ui/react'

import type { Todo } from '../types'

type TodoItemProps = Readonly<{ todo: Todo; onToggle(id: number): void }>

const TodoItem = ({ todo, onToggle }: TodoItemProps) => {
  return (
    <ListItem display="flex" gap="2">
      <Checkbox
        colorScheme="green"
        spacing="4"
        isChecked={todo.completed}
        onChange={() => {
          onToggle(todo.id)
        }}
      />

      <Text>{todo.text}</Text>
    </ListItem>
  )
}

export type TodoListProps = Readonly<{
  todos: readonly Todo[]
  onToggle(id: number): void
}>

export const TodoList = ({ todos, onToggle }: TodoListProps) => {
  return (
    <List pt="4">
      {todos.length === 0 ? (
        <Text fontWeight="semibold">No items</Text>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
        ))
      )}
    </List>
  )
}
