import {
  Button,
  ButtonGroup,
  Checkbox,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react'
import type { Task } from '@srtp/fake-tasks'
import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

export type VirtualTodoItemProps = Readonly<{
  todo: Readonly<Task>
  onToggle?(id: Task): void
  onDelete?(id: number): void
}>

const VirtualTodoItem = React.memo(
  ({ todo, ...actions }: VirtualTodoItemProps) => (
    <HStack p={1}>
      <Checkbox
        isChecked={todo.completed}
        onChange={() => actions.onToggle?.(todo)}
      />
      <Text>{todo.id}</Text>
      <Text p="2">{todo.title}</Text>
      <Spacer />

      {actions.onDelete && (
        <ButtonGroup>
          <Button>Edit</Button>
          <Button onClick={() => actions.onDelete?.(todo.id)}>Delete</Button>
        </ButtonGroup>
      )}
    </HStack>
  ),
)

export type VirtualTodoListViewProps = Readonly<{
  todoList: readonly Task[]
  itemCount: number
  onToggle?(id: Task): void
  onDelete?(todo: number): void
}>

export const VirtualTodoListView = ({
  todoList,
  itemCount,
  ...actions
}: VirtualTodoListViewProps) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <FixedSizeList
          itemData={todoList}
          itemCount={itemCount}
          itemSize={40}
          width={width ?? 1280}
          height={height ?? 720}
        >
          {({ data, index, style }) => (
            <span style={style}>
              <VirtualTodoItem
                key={data[index].id}
                todo={data[index]}
                {...actions}
              />
            </span>
          )}
        </FixedSizeList>
      )}
    </AutoSizer>
  )
}
